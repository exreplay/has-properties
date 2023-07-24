import { assertType, it, describe } from "vitest";
import { Path, hasProperties } from "../src";

describe("hasProperties", () => {
  it("should generate paths correctly", () => {
    const obj = { a: { b: { c: 1 } } };

    assertType<Path<typeof obj>>("a");
    assertType<Path<typeof obj>>("a.b");
    assertType<Path<typeof obj>>("a.b.c");
    // @ts-expect-error key "d" does not exist
    assertType<Path<typeof obj>>("a.b.c.d");
  });

  it("should have correct type when defined", () => {
    const obj = { a: { b: { c: 1 } } };

    if (hasProperties(obj, "a.b.c")) {
      assertType<number>(obj.a.b.c);
    }
  });

  it("should have correct type when undefined", () => {
    const obj: {
      a: {
        b: {
          c?: number;
        };
      };
    } = { a: { b: {} } };

    if (hasProperties(obj, "a.b.c")) {
      assertType<number>(obj.a.b.c);
    }
  });

  it("should have correct type when not checking for requested key", () => {
    const obj: {
      a: {
        b: {
          c?: number;
        };
      };
    } = { a: { b: {} } };

    if (hasProperties(obj, "a.b")) {
      assertType<number | undefined>(obj.a.b.c);
    }
  });

  it("should have correct type when not checking for requested key", () => {
    const obj: {
      a: {
        b: {
          c?: number;
        };
        d?: {
          e: string;
        };
      };
    } = { a: { b: {} } };

    if (hasProperties(obj, "a.b")) {
      assertType<number | undefined>(obj.a.b.c);
      assertType<string | undefined>(obj.a.d.e);
    }
  });
});
