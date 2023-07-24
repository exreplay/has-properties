import { expect, it, describe } from "vitest";
import { hasProperties } from "../src/index";

describe("hasProperties", () => {
  it("should return true if the object has the properties", () => {
    const obj = { a: { b: { c: 1 } } };

    expect(hasProperties(obj, "a.b.c")).toBe(true);
  })

  it("should return false if the object does not have the properties", () => {
    const obj = { a: { b: { c: undefined } } };

    // @ts-expect-error key "d" does not exist
    expect(hasProperties(obj, "a.b.d")).toBe(false);
  })

  it("should return false if the object does not have the properties", () => {
    const obj: {
      a: {
        b: {
          c?: number;
        };
        d?: {
          e: string;
        }
      };

    } = { a: { b: { c: undefined } } };

    if(hasProperties(obj, "a.b.c")) {
      expect(obj.a.d.e).toBe('test');
      expect(obj.a.b.c).toBe(undefined);
    }
  })
});
