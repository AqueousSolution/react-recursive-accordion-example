import React from "react";

type AccordionNode<T> = {
  id: string;
  value: T;
  expanded: boolean;
  children: AccordionNode<T>[];
};

type AccordionProps<T> = {
  node: AccordionNode<T>;
  toggle: (id: string) => void;
  select: (node: AccordionNode<T>) => void;
};

export const AccordionItem = <T,>({ node, toggle, select }: AccordionProps<T>) => {

  const button = node.children.length
    ? <button
        onClick={() => toggle(node.id)}
        style={{ width: "4rem", fontSize: "2rem" }}>
          {node.expanded ? "-" : "+"}
      </button>
    : <div style={{ display: "inline-block", width: "4rem" }}></div>;

  const children = node.expanded
    ? node.children
      .map(child =>
        <AccordionItem
          key={child.id}
          node={child}
          toggle={toggle}
          select={select} />)
    : null;

  return (
    <div style={{ fontSize: "2rem" }}>
      <div>
        {button}
        <span
          onClick={() => select(node)}
          style={{ display: "inline-block", paddingLeft: "0.5rem", cursor: "pointer", textDecoration: "underline" }}>
            {node.value}
        </span>
      </div>
      <div style={{ paddingLeft: "2rem" }}>{children}</div>
    </div>
  );
};
