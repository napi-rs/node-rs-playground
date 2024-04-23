import ReactCodeMirror from '@uiw/react-codemirror'
import { EditorView } from '@codemirror/view'
import { okaidia } from '@uiw/codemirror-theme-okaidia'
import { json } from '@codemirror/lang-json'
import { verify, sign, Algorithm, Header } from '@node-rs/jsonwebtoken'
import { nanoid } from 'nanoid'

import { Textarea } from './components/ui/textarea'
import { Badge } from './components/ui/badge'
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from './components/ui/select'
import { useCallback, useEffect, useState } from 'react'

// @ts-expect-error
const SelectItems = Object.keys(Algorithm).map((algorithm) => (
  <SelectItem key={algorithm} value={algorithm}>
    {algorithm}
  </SelectItem>
))

const now = parseInt((Date.now() / 1000).toFixed(0), 10)
const week = 60 * 60 * 24 * 7

const FIXED_ID = nanoid()
const FIXED_SUB = nanoid()

const [publicKey, privateKey] = await crypto.subtle
  .generateKey(
    {
      name: 'ECDSA',
      namedCurve: 'P-256',
    },
    true,
    ['sign', 'verify']
  )
  .then((key) => {
    return Promise.all([
      crypto.subtle
        .exportKey('spki', key.publicKey)
        .then((key) => cryptoKeyToPEM(key, 'public')),
      crypto.subtle
        .exportKey('pkcs8', key.privateKey)
        .then((key) => cryptoKeyToPEM(key, 'private')),
    ])
  })

export function JsonWebToken() {
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.ES256)
  const [verified, setVerified] = useState(true)
  const [claims, setClaims] = useState({
    data: {
      id: FIXED_ID,
      name: 'John Doe',
    },
    sub: FIXED_SUB,
    iss: 'node-rs.prod',
    iat: now,
    exp: now + week,
    aud: 'https://node-rs.dev',
  })
  const [header, setHeader] = useState<Header>({
    algorithm,
    contentType: 'JWT',
  })
  const [jwt, setJwt] = useState('')

  useEffect(() => {
    sign(claims, privateKey, header)
      .then((jwt) => {
        setJwt(jwt)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [claims, header])

  const onChangeClaims = useCallback((value: string) => {
    setClaims(JSON.parse(value))
  }, [])

  useEffect(() => {
    if (!jwt.length) {
      return
    }

    verify(jwt, publicKey, {
      algorithms: [algorithm],
      requiredSpecClaims: ['exp', 'iat', 'iss', 'sub'],
      iss: ['node-rs.prod'],
      aud: ['https://node-rs.dev'],
    })
      .then(() => {
        setVerified(true)
      })
      .catch((err) => {
        console.log(err, jwt, publicKey, algorithm)
        setVerified(false)
      })
  }, [jwt, algorithm])

  const badge = verified ? (
    <Badge variant="default">Signature Verified</Badge>
  ) : (
    <Badge variant="destructive">Signature Invalid</Badge>
  )

  return (
    <>
      <div className="tw-w-full tw-flex">
        <span className="tw-leading-10">Algorithm</span>
        <div className="tw-ml-5">
          <Select
            defaultValue={algorithm}
            disabled={true}
            onValueChange={(value: Algorithm) => {
              setAlgorithm(value)
              setHeader((v) => ({ ...v, algorithm: value }))
            }}
          >
            <SelectTrigger id="algorithm">
              <SelectValue placeholder="Algorithm" />
            </SelectTrigger>
            <SelectContent position="popper">{SelectItems}</SelectContent>
          </Select>
        </div>
      </div>
      <div className="tw-mt-10 tw-flex tw-flex-col tw-gap-8 lg:tw-flex-row">
        <div className="tw-flex-1">
          <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
            <h2 className="text-xl font-semibold">Encoded</h2>
            <span className="text-sm">PASTE A TOKEN HERE</span>
          </div>
          <ReactCodeMirror
            value={jwt}
            width="300px"
            theme={okaidia}
            extensions={[EditorView.lineWrapping]}
            className="tw-break-words tw-mb-4"
            onChange={setJwt}
          />
          <div className="tw-flex tw-items-center tw-justify-between">
            {badge}
          </div>
        </div>
        <div className="tw-flex-1">
          <div className="tw-justify-between tw-mb-2 tw-flex tw-items-center">
            <h2 className="tw-text-xl tw-font-semibold">Decoded</h2>
            <span className="tw-text-sm">EDIT THE PAYLOAD AND SECRET</span>
          </div>
          <div className="tw-mt-5 tw-mb-4">
            <h3 className="tw-mb-5 tw-text-sm tw-font-semibold">
              HEADER: ALGORITHM & TOKEN TYPE
            </h3>
            <ReactCodeMirror
              value={JSON.stringify(header, null, 2)}
              width="320px"
              readOnly={true}
              theme={okaidia}
              extensions={[EditorView.lineWrapping, json()]}
              className="tw-break-words tw-mb-4"
            />
          </div>
          <div className="tw-mb-4">
            <h3 className="tw-mb-5 tw-text-sm tw-font-semibold">PAYLOAD</h3>
            <ReactCodeMirror
              value={JSON.stringify(claims, null, 2)}
              width="320px"
              theme={okaidia}
              extensions={[EditorView.lineWrapping, json()]}
              className="tw-break-words tw-mb-4"
              onChange={onChangeClaims}
            />
          </div>
          <div className="tw-mb-4">
            <h3 className="tw-mb-5 tw-text-sm tw-font-semibold">
              GENERATED PUBLIC KEY
            </h3>
            <Textarea
              className="tw-w-full tw-h-[100px]"
              readOnly
              value={publicKey}
            />
          </div>
        </div>
      </div>
    </>
  )
}

function cryptoKeyToPEM(keydata: ArrayBuffer, type: 'public' | 'private') {
  const keydataS = arrayBufferToString(keydata)
  const keydataB64 = btoa(keydataS)
  return formatAsPem(keydataB64, type)
}

function arrayBufferToString(buffer: ArrayBuffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return binary
}

function formatAsPem(str: string, type: 'public' | 'private') {
  const keyType = type === 'public' ? 'PUBLIC' : 'PRIVATE'
  let finalString = `-----BEGIN ${keyType} KEY-----\n`

  while (str.length > 0) {
    finalString += str.substring(0, 64) + '\n'
    str = str.substring(64)
  }

  finalString = finalString + `-----END ${keyType} KEY-----`

  return finalString
}
