import ReactCodeMirror from '@uiw/react-codemirror'
import { EditorView } from '@codemirror/view'
import { okaidia } from '@uiw/codemirror-theme-okaidia'
import { json } from '@codemirror/lang-json'

import { Textarea } from './components/ui/textarea'
import { Badge } from './components/ui/badge'
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from './components/ui/select'

export function JsonWebToken() {
  return (
    <>
      <div className="tw-w-full tw-flex">
        <span className="tw-leading-10">Algorithm</span>
        <div className="tw-ml-5">
          <Select defaultValue="HS256">
            <SelectTrigger id="algorithm">
              <SelectValue placeholder="Algorithm" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="HS256">HS256</SelectItem>
              <SelectItem value="RS256">RS256</SelectItem>
            </SelectContent>
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
            value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
            width="300px"
            theme={okaidia}
            extensions={[EditorView.lineWrapping]}
            className="tw-break-words tw-mb-4"
          />
          <div className="tw-flex tw-items-center tw-justify-between">
            <Badge variant="secondary">Signature Verified</Badge>
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
              value={`{\n  "alg": "HS256",\n  "typ": "JWT"\n}`}
              width="320px"
              theme={okaidia}
              extensions={[EditorView.lineWrapping, json()]}
              className="tw-break-words tw-mb-4"
            />
          </div>
          <div className="tw-mb-4">
            <h3 className="tw-mb-5 tw-text-sm tw-font-semibold">
              PAYLOAD: DATA
            </h3>
            <ReactCodeMirror
              value={`{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}`}
              width="320px"
              theme={okaidia}
              extensions={[EditorView.lineWrapping, json()]}
              className="tw-break-words tw-mb-4"
            />
          </div>
          <div className="tw-mb-4">
            <h3 className="tw-mb-5 tw-text-sm tw-font-semibold">
              VERIFY SIGNATURE
            </h3>
            <Textarea
              className="tw-w-full tw-h-[100px]"
              readOnly
              placeholder="HMACSHA256(base64UrlEncode(header) + '.' + base64UrlEncode(payload), your-256-bit-secret"
            />
          </div>
        </div>
      </div>
    </>
  )
}
