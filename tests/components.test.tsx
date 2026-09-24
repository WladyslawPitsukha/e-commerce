import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CommentForm } from "@/app/(services)/shop/components/commentForm";
import ProductTabs from "@/app/(services)/shop/components/productTabs";
import ShopCatalog from "@/app/(services)/shop/components/shopCatalog";
import { CreationPrice } from "@/components/mainPage/creationPrice";
import { CartProvider, useCart } from "@/components/cart/cartProvider";
import NavBar from "@/components/mainPage/navbar";
import { catalogProducts } from "@/utils/productRoutes";

vi.mock("next/navigation", () => ({ usePathname: () => "/shop" }));
vi.mock("@/components/mainPage/clothesCard", () => ({ default: ({ title }: { title: string }) => <div>{title}</div> }));
vi.mock("@/components/mainPage/footer", () => ({ default: () => <footer>Footer</footer> }));
vi.mock("@/app/(services)/shop/components/headerProduct", () => ({ default: () => <div>Product header</div> }));
vi.mock("@/app/(services)/shop/components/detailsProduct", () => ({ default: () => <div>Product details content</div> }));
vi.mock("@/app/(services)/shop/components/reviewsProduct", () => ({ default: () => <div>Review content</div> }));
vi.mock("@/app/(services)/shop/components/faqsProduct", () => ({ default: () => <div>FAQ content</div> }));

function CartProbe() {
    const { items, subtotal, addItem, updateQuantity } = useCart();
    return (
        <div>
            <output data-testid="quantity">{items[0]?.quantity ?? 0}</output>
            <output data-testid="subtotal">{subtotal}</output>
            <button type="button" onClick={() => addItem({ category: "active", productId: 1, slug: "shirt", title: "Shirt", image: "/shirt.png", unitPrice: 20, quantity: 1, size: "M", color: "Black" })}>Add</button>
            <button type="button" onClick={() => updateQuantity(items[0]?.key ?? "", 3)}>Set three</button>
        </div>
    );
}

describe("CreationPrice", () => {
    it("renders the discounted and original prices", () => {
        render(<CreationPrice mainPrice={100} option procent={25} />);
        expect(screen.getByText("$75")).toBeInTheDocument();
        expect(screen.getByText("$100")).toBeInTheDocument();
        expect(screen.getByText("-25%")).toBeInTheDocument();
    });
});

describe("CommentForm", () => {
    it("requires content and submits trimmed review data", async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();
        render(<CommentForm onSubmit={onSubmit} />);
        fireEvent.submit(screen.getByRole("button", { name: "Submit Review" }));
        expect(onSubmit).not.toHaveBeenCalled();
        await user.type(screen.getByPlaceholderText("Your name"), "  Alex  ");
        await user.type(screen.getByPlaceholderText("Your review"), "  Great fit  ");
        await user.click(screen.getByRole("button", { name: "Submit Review" }));
        expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ username: "Alex", textCom: "Great fit", grade: 5 }));
    });
});

describe("CartProvider", () => {
    it("adds items and updates quantity and subtotal", async () => {
        const user = userEvent.setup();
        render(<CartProvider><CartProbe /></CartProvider>);
        await user.click(screen.getByRole("button", { name: "Add" }));
        expect(screen.getByTestId("quantity")).toHaveTextContent("1");
        expect(screen.getByTestId("subtotal")).toHaveTextContent("20");
        await user.click(screen.getByRole("button", { name: "Set three" }));
        expect(screen.getByTestId("quantity")).toHaveTextContent("3");
        expect(screen.getByTestId("subtotal")).toHaveTextContent("60");
    });
});

describe("NavBar", () => {
    it("submits the entered search term to the search route", async () => {
        const user = userEvent.setup();
        render(<NavBar />);
        const input = screen.getByRole("textbox", { name: "Search for products" });
        await user.type(input, "linen shirt");
        expect(input).toHaveValue("linen shirt");
        expect(input.closest("form")).toHaveAttribute("action", "/search");
    });
});

describe("ShopCatalog", () => {
    it("updates category filters and sort controls", async () => {
        const user = userEvent.setup();
        render(<ShopCatalog products={catalogProducts} />);
        const category = screen.getByRole("checkbox", { name: "Casual" });
        await user.click(category);
        expect(category).toBeChecked();
        await user.selectOptions(screen.getByRole("combobox", { name: "Sort products" }), "price-asc");
        expect(screen.getByRole("combobox", { name: "Sort products" })).toHaveValue("price-asc");
    });
});

describe("ProductTabs", () => {
    it("switches from product details to reviews", async () => {
        const user = userEvent.setup();
        const product = catalogProducts[0]?.product;
        if (!product) throw new Error("Expected catalog product");
        render(<ProductTabs product={product} category="casualwear" />);
        expect(screen.getByText("Product details content")).toBeInTheDocument();
        await user.click(screen.getByRole("tab", { name: "Rating & Reviews" }));
        expect(screen.getByText("Review content")).toBeInTheDocument();
    });
});