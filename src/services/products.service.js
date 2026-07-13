import { readDocuments, readDocument, createDocument, updateDocument, deleteDocument } from "../models/products.models.js";

const COLLECTION = "products";

export const createProductService = async (product) => {
    return await createDocument(COLLECTION, product)
}

export const deleteProductService = async (id) => {
    console.log("Capa de servicios")
    return await deleteDocument(COLLECTION, id)
}

export const updateProductService = async (id, data) => {
    return await updateDocument(COLLECTION, id, data)
}

export const getProductByIdService = async (id) => {
    return await readDocument(COLLECTION, id);
};

export const getProductsByFilters = async ({ category, price }) => {
    if (category === undefined && price === undefined) {
        return await readDocuments(COLLECTION);
    }

    const products = await readDocuments(COLLECTION);
    // Filtramos los products según los filtros que se hayan pasado. Si un filtro no se pasó, no lo aplicamos.
    return products.filter(product => {
        // Empezamos asumiendo que el product cumple todos los filtros.
        let match = true;

        // Si se pasa categoría, verificamos que coincida.
        if (category !== undefined) {
            // Si match = true, match se mantiene true solo si la categoría coincide. Si no coincide, match se vuelve false.
            match = match && product.category === category;
        }

        // Si se pasa precio, verificamos que el product tenga un precio menor o igual.
        // Si match ya es false, permanece false.
        if (price !== undefined) {
            match = match && product.price <= price;
        }

        // Al final, devolvemos true si el product pasó todos los filtros activos.
        return match;
    });
};