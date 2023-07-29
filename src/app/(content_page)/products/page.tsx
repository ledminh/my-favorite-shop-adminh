import Category from "@/components/products/Category";

import ProductList from "@/components/products/ProductList";
import { getProducts } from "@/data/products";
import { getCategories } from "@/data/categories";

import { itemsPerPage } from "@/config";
import ControlPanel from "@/components/products/ControlPanel";

type Props = {
  searchParams?: {
    variants?: boolean;
    promotion?: boolean;
    catID?: string;
    searchTerm?: string;
    sortBy?: "name" | "price" | "createdAt" | "modifiedAt";
    order?: "asc" | "desc";
  };
};

export default async function ProductsPage({ searchParams }: Props) {
  const _sortBy = searchParams?.sortBy || "name";
  const _order = searchParams?.order || "asc";
  const _searchTerm = searchParams?.searchTerm || "";
  const _catID = searchParams?.catID || "";
  const _variants = searchParams?.variants || false;
  const _promotion = searchParams?.promotion || false;

  const filters = {
    variants: _variants,
    promotion: _promotion,
    catID: _catID,
    searchTerm: _searchTerm,
  };

  const categoriesPromise = await getCategories({
    sortBy: "name",
    order: "asc",
  });

  const productsPromise = getProducts({
    offset: 0,
    limit: itemsPerPage,
    sortBy: _sortBy,
    order: _order,
    filters,
  });

  const [{ items: categories }, { items: initProducts, total }] =
    await Promise.all([categoriesPromise, productsPromise]);

  return (
    <div className="m-4">
      <div className="mb-8">
        <Category categories={categories} initCatID={_catID} />
      </div>
      <div className="mb-8">
        <ControlPanel
          initSortBy={_sortBy}
          initOrder={_order}
          initSearchTerm={_searchTerm}
          sortByOptions={sortByOptions}
          filterOptions={filterOptions}
          initFilterID={
            _variants ? "with-variants" : _promotion ? "with-promotion" : null
          }
        />
      </div>
      <ProductList
        initProducts={initProducts}
        total={total}
        filters={filters}
        sortBy={_sortBy}
        order={_order}
      />
    </div>
  );
}

/***********************
 * Data
 */

const sortByOptions: {
  id: "name" | "price" | "createdAt" | "modifiedAt";
  text: string;
  orderOptions: {
    id: "asc" | "desc";
    text: string;
  }[];
}[] = [
  {
    id: "name",
    text: "Name",
    orderOptions: [
      {
        id: "asc",
        text: "A to Z",
      },
      {
        id: "desc",
        text: "Z to A",
      },
    ],
  },
  {
    id: "price",
    text: "Price",
    orderOptions: [
      {
        id: "asc",
        text: "Low to High",
      },
      {
        id: "desc",
        text: "High to Low",
      },
    ],
  },
  {
    id: "createdAt",
    text: "Create At",
    orderOptions: [
      {
        id: "asc",
        text: "Oldest to Newest",
      },
      {
        id: "desc",
        text: "Newest to Oldest",
      },
    ],
  },
  {
    id: "modifiedAt",
    text: "Modified At",
    orderOptions: [
      {
        id: "asc",
        text: "Oldest to Newest",
      },
      {
        id: "desc",
        text: "Newest to Oldest",
      },
    ],
  },
];

const filterOptions: {
  id: "with-variants" | "with-promotion";
  text: string;
}[] = [
  {
    id: "with-variants",
    text: "With Variants",
  },
  {
    id: "with-promotion",
    text: "With Promotion",
  },
];
