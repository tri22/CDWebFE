"use client";
import * as React from "react";

function ShopSidebar() {
  return (
    <aside className="shop-sidebar">
      <section className="category-section">
        <h2 className="section-title">Category</h2>
        <ul className="category-list">
          <li className="category-item">Ceiling (25)</li>
          <li className="category-item">Floor (25)</li>
          <li className="category-item">Led (25)</li>
          <li className="category-item">Modern (25)</li>
          <li className="category-item">Retro (25)</li>
          <li className="category-item">Wood (25)</li>
        </ul>
      </section>

      <section className="color-section">
        <h2 className="section-title">Color</h2>
        <ul className="color-list">
          <li className="color-item">Black (25)</li>
          <li className="color-item">Blue (25)</li>
          <li className="color-item">Red (25)</li>
          <li className="color-item">Green (25)</li>
          <li className="color-item">Yellow (25)</li>
          <li className="color-item">Grey (25)</li>
        </ul>
      </section>

      <div className="price-selector">
        <div className="price-dot" />
        <p className="price-range">Price $4 - $ 800</p>
      </div>

      <style jsx>{`
        .shop-sidebar {
          align-self: start;
          display: flex;
          margin-top: 18px;
          flex-direction: column;
          align-items: start;
          font-family: Product Sans, -apple-system, Roboto, Helvetica, sans-serif;
          font-size: 19px;
          color: rgba(126, 126, 126, 1);
          font-weight: 400;
        }
        .section-title {
          color: rgba(45, 45, 45, 1);
          font-size: 23px;
          font-weight: 700;
          margin: 0;
        }
        .category-list, .color-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        .category-item, .color-item {
          margin-top: 32px;
          cursor: pointer;
        }
        .color-section {
          margin-top: 40px;
        }
        .price-selector {
          margin-top: 53px;
        }
        @media (max-width: 991px) {
          .price-selector {
            margin-top: 40px;
          }
        }
        .price-dot {
          background-color: rgba(75, 75, 75, 1);
          border-radius: 50%;
          display: flex;
          width: 19px;
          flex-shrink: 0;
          height: 19px;
        }
        .price-range {
          align-self: stretch;
          margin-top: 43px;
        }
        @media (max-width: 991px) {
          .price-range {
            margin-top: 40px;
          }
        }
      `}</style>
    </aside>
  );
}

export default ShopSidebar;
