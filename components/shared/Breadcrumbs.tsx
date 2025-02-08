import Link from "next/link";
import React from "react";

const Breadcrumbs = ({
  title,
  breadcrumbs,
}: {
  title: string;
  breadcrumbs: Array<{ title: string; link: string }>;
}) => {
  return (
    <section className="breadcrumbs">
      <nav className="container d-flex justify-content-between align-items-center">
        <h2>{title}</h2>
        <ol>
          {breadcrumbs.map((item, index) => (
            <li key={index}>
              <Link href={`${item.link}`}>{item.title}</Link>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
};

export default Breadcrumbs;
