import React from "react";

import { AccordionItem } from "./accordion-item";

const defaultTree = {
  id: "0",
  value: "",
  expanded: false,
  children: []
};


export const App = () => {
  const [tree, setTree] = React.useState(defaultTree);
  const [selected, setSelected] = React.useState(null);

  React.useEffect(() => {
    loadData()
      .then(tree => setTree(buildAccordionData(tree, "0")));
  }, []);

  const unsetTree = () => {
    setTree(collapseTree(tree));
    setSelected(null);
  };

  const toggle = id => setTree(toggleNode(tree, id));
  const select = node => setSelected(node);

  return (
    <div>
      <aside>
        <button onClick={unsetTree} style={{ width: "4rem", fontWeight: "bold" }}>CLOSE</button>
        <AccordionItem node={tree} toggle={toggle} select={select} />;
      </aside>
      <section style={{ fontSize: "4rem", padding: "2rem" }}>
        {selected && selected.value}
      </section>
    </div>
  );
};


const buildAccordionData = (root, id = "0") => {
  const node = {
    id: id,
    expanded: false,
    value: root.value,
    children: root.children.map((child, i) => buildAccordionData(child, `${id}.${i}`))
  };
  return node;
};


const toggleNode = (root, id) => {
  const found = root.id === id;
  const expanded = found ? !root.expanded : root.expanded;

  const children = (found && !expanded)
    ? root.children.map(child => collapseTree(child))
    : root.children.map(child => toggleNode(child, id));

  return { ...root, expanded, children };
};

const collapseTree = (root) => {
  return {
    ...root,
    expanded: false,
    children: root.children.map(child => collapseTree(child))
  };
};


const loadData = () => import("./data").then(m => m.default);
