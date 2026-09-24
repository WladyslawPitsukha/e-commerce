import React from "react";
import { axe } from "jest-axe";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CommentForm } from "@/app/(services)/shop/components/commentForm";
import NavBar from "@/components/mainPage/navbar";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("accessibility", () => {
    it("has no detectable violations in navigation and review form", async () => {
        const navigation = render(<NavBar />);
        expect((await axe(navigation.container)).violations).toEqual([]);
        const review = render(<CommentForm onSubmit={vi.fn()} />);
        expect((await axe(review.container)).violations).toEqual([]);
    });
});