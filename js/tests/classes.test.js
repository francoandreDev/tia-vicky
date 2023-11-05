import { describe, test, expect } from "vitest";
import { Operations } from "../classes/exports";

describe("Class Operations", () => {
    const op = new Operations(1, 2);
    test("Instance of a Class", () => {
        expect(op).toBeInstanceOf(Operations);
    });
    test("addition", () => {
        expect(op.addition()).toBe(3);
    });
    test("subtraction", () => {
        expect(op.subtraction()).toBe(-1);
    });
    test("multiplication", () => {
        expect(op.multiplication()).toBe(2);
    });
    test("division", () => {
        expect(op.division()).toBe(0.5);
    });
});
