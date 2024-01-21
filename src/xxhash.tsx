import { xxh32, xxh64, xxh3 } from '@node-rs/xxhash';

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from './components/ui/card';
import { Label } from './components/ui/label';
import { Textarea } from './components/ui/textarea';
import { Button } from './components/ui/button';
import { ChangeEvent, useCallback, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';

enum Algorithm {
  Xxhash32 = 'xxhash32',
  Xxhash64 = 'xxhash64',
  Xxh3 = 'xxh3',
  Xx3Xxh64 = 'xx3-xxh64',
  Xx3Xxh128 = 'xx3-xxh128',
}

export default function Component() {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState<number | bigint>(0);
  const [algorithm, setAlgorithm] = useState(Algorithm.Xxhash32);
  const onInput = useCallback((evt: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(evt.target.value);
  }, []);
  const onHash = useCallback(() => {
    switch (algorithm) {
      case Algorithm.Xxhash32:
        setHash(xxh32(input));
        break;
      case Algorithm.Xxhash64:
        setHash(xxh64(input));
        break;
      case Algorithm.Xxh3:
        setHash(xxh3.Xxh3.withSeed().update(input).digest());
        break;
      case Algorithm.Xx3Xxh64:
        setHash(xxh3.xxh64(input));
        break;
      case Algorithm.Xx3Xxh128:
        setHash(xxh3.xxh128(input));
        break;
    }
    setHash(xxh32(input));
  }, [input, algorithm]);
  return (
    <Card className="tw-mt-4">
      <CardHeader className="tw-space-y-1">
        <CardTitle className="tw-text-2xl tw-font-bold">
          Xxhash Playground
        </CardTitle>
        <CardDescription>
          Enter a content below to perform xxhash
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="tw-space-y-4">
          <div className="tw-space-y-2">
            <div>
              <Label htmlFor="tw-sentence">Input</Label>
              <Textarea
                className="tw-mt-4"
                id="sentence"
                placeholder="Enter input to hash"
                required
                onChange={onInput}
              />
            </div>
          </div>
          <Select
            defaultValue={Algorithm.Xxhash32}
            // @ts-expect-error value not match
            onValueChange={setAlgorithm}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a Algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Algorithm.Xxhash32}>Xxh32</SelectItem>
              <SelectItem value={Algorithm.Xxhash64}>Xxh64</SelectItem>
              <SelectGroup>
                <SelectLabel>XXH3</SelectLabel>
                <SelectItem value={Algorithm.Xxh3}>Xxh3</SelectItem>
                <SelectItem value={Algorithm.Xx3Xxh64}>Xxh3 - Xxh64</SelectItem>
                <SelectItem value={Algorithm.Xx3Xxh128}>
                  Xxh3 - Xxh128
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button className="tw-w-full" onClick={onHash}>
            Hash
          </Button>
          <div className="tw-space-y-2">
            <p>{hash.toString(16)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
