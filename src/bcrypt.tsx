import { hash, DEFAULT_COST, verify } from '@node-rs/bcrypt';
import { useCallback, useState } from 'react';
import { Loader2 } from 'lucide-react';

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from './components/ui/card';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { useToast } from './components/ui/use-toast';

export default function Component() {
  const [password, setPassword] = useState('');
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cost, setCost] = useState(DEFAULT_COST);
  const [hashed, setHash] = useState('');
  const [inputHash, setInputHash] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const { toast } = useToast();
  const onChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );
  const onChangeCost = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCost(Number(event.target.value));
    },
    []
  );
  const onGenerateHash = useCallback(() => {
    setLoading(true);
    const timeStart = Date.now();
    hash(password, cost).then((res) => {
      setHash(res);
      setDuration(Date.now() - timeStart);
      setLoading(false);
    });
  }, [password, cost]);

  const onCopyHash = useCallback(() => {
    navigator.clipboard
      .writeText(hashed)
      .then(() => {
        toast({
          title: 'Copied',
          description: 'Hash copied to clipboard',
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, [hashed, toast]);

  const onChangeHash = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputHash(event.target.value);
    },
    []
  );
  const onChangeInputPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputPassword(event.target.value);
    },
    []
  );
  const onVerifyHash = useCallback(() => {
    verify(inputPassword, inputHash)
      .then((res) => {
        if (res) {
          toast({
            // @ts-expect-error type mismatch
            title: <span className="tw-text-lime-200">Verified</span>,
            description: 'Hash verified',
          });
        } else {
          toast({
            // @ts-expect-error type mismatch
            title: <span className="tw-text-yellow-200">Not verified</span>,
            description: 'Hash not verified',
          });
        }
      })
      .catch((err) => {
        toast({
          // @ts-expect-error type mismatch
          title: <span className="tw-text-red-600">Error</span>,
          description: <span className="tw-font-mono">{err.message}</span>,
        });
      });
  }, [inputHash, inputPassword, toast]);

  return (
    <div className="tw-space-y-4">
      <Card>
        <CardHeader className="tw-space-y-1">
          <CardTitle className="tw-text-2xl tw-font-bold">
            Bcrypt Playground
          </CardTitle>
          <CardDescription>
            Enter a password below to generate a bcrypt hash
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="tw-space-y-4">
            <div className="tw-space-y-2">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter password"
                  required
                  type="text"
                  onChange={onChangePassword}
                />
              </div>
              <div>
                <Label htmlFor="cost">Cost</Label>
                <Input
                  id="cost"
                  type="number"
                  defaultValue={DEFAULT_COST}
                  min={4}
                  max={31}
                  onChange={onChangeCost}
                />
              </div>
            </div>
            <Button
              disabled={!password || loading}
              className="tw-w-full"
              onClick={onGenerateHash}
              variant="outline"
            >
              Generate Hash
            </Button>
            <div className="tw-space-y-2 ">
              <p className="tw-font-mono tw-subpixel-antialiased tw-text-indigo-300 tw-break-words ">
                {hashed}{' '}
                {hashed.trim().length ? (
                  <Button variant="outline" onClick={onCopyHash} size="sm">
                    Copy
                  </Button>
                ) : null}
              </p>
              <p className="tw-font-mono tw-subpixel-antialiased tw-break-words tw-text-lime-400">
                duration: <code>{duration} ms</code>
              </p>
            </div>
          </div>
          {loading ? (
            <Loader2 className="tw-absolute tw-top-1/2 tw-left-1/2 tw-animate-spin" />
          ) : null}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="tw-space-y-1">
          <CardTitle className="tw-text-2xl tw-font-bold">
            Bcrypt verify
          </CardTitle>
          <CardDescription>Enter a hash below to verify</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="tw-space-y-4">
            <div className="tw-space-y-2">
              <div>
                <Label htmlFor="input-password">Password to verify</Label>
                <Input
                  id="input-password"
                  placeholder="Enter password to verify"
                  required
                  type="text"
                  onChange={onChangeInputPassword}
                />
              </div>
              <div>
                <Label htmlFor="hash">Password hash</Label>
                <Input
                  id="hash"
                  placeholder="Enter hash"
                  required
                  type="text"
                  onChange={onChangeHash}
                />
              </div>
            </div>
          </div>
          <Button
            disabled={!inputHash || !inputPassword}
            className="tw-w-full tw-mt-4"
            onClick={onVerifyHash}
            variant="outline"
          >
            Click to verify
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
