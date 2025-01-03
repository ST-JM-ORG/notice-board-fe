"use client";

import React, { use } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function Page(props: Props) {
  const { params } = props;

  const { id } = use(params);

  return <div>{id}</div>;
}
