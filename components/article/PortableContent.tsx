// components/PortableContent.tsx
"use client";

import { PortableText } from "@portabletext/react";

const components = {
  block: {
    h1: ({ children }: any) => <h1 className="text-2xl font-bold">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-xl font-semibold">{children}</h2>,
    normal: ({ children }: any) => <p className="my-2">{children}</p>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc ml-4">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal ml-4">{children}</ol>,
  },
};

const PortableContent = ({ value }: { value: any }) => {
  return <PortableText value={value} components={components} />;
};

export default PortableContent;
