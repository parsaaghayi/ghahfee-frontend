import { Metadata } from "next";

type Props = { params: { productId: string } };

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `محصول ${params.productId} | فروشگاه قهفی`,
  };
}

export default function ProductPage({ params }: Props) {
  return <main>محصول {params.productId}</main>;
} 