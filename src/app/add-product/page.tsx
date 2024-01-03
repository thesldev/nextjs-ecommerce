import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Add Product - Flowmazon"
}

async function addProduct(formData: FormData) {
    "use  server";

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl =  formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price") || 0);

    if(!name || !description || !imageUrl || !price){
        throw Error("Missing required fields")
    }

    await prisma.product.create({
        data: {name, description, imageUrl, price},
    });

    redirect("/");
}

export default function AddProductPage() {
    return(
        <div>
            <h1 className="mb-3 text-lg font-bold">Add Product</h1>
            <form action={addProduct}>
                <input type="text" className="mb-3 w-full input input-bordered" required name="name" placeholder="Name"/>
                <textarea name="description" placeholder="Description" className="textarea-bordered textarea mb-3 w-full" ></textarea>
                <input type="url" className="mb-3 w-full input input-bordered" required name="imageUrl" placeholder="Image URL"/>
                <input type="number" className="mb-3 w-full input input-bordered" required name="price" placeholder="Price"/>
                <button className="btn btn-primary btn-block" type="submit">Add Product</button>
            </form>
        </div>
    )
}