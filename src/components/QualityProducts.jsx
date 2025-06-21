import React from "react";

const QualityProductsFontAndStyle = () => (
  <style>
    {`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
    .quality-products-section {
      background: #FFFDFC;
      width: 100%;
      padding-top: 6vw;
      padding-bottom: 5vw;
      min-height: 260px;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
    }
    .quality-products-heading {
      color: #111;
      font-family: 'Montserrat', sans-serif;
      font-weight: 400;
      font-size: 3.2rem;
      line-height: 1.08;
      letter-spacing: 0;
      margin-bottom: 2.5vw;
      text-align: center;
    }
    .quality-products-desc {
      color: #888;
      font-family: 'Montserrat', sans-serif;
      font-weight: 400;
      font-size: 2rem;
      line-height: 1.35;
      max-width: 900px;
      text-align: center;
      margin: 0 auto 1vw auto;
      letter-spacing: 0.01em;
    }

    @media (max-width: 1000px) {
      .quality-products-section {
        padding-top: 3.5rem;
        padding-bottom: 2.5rem;
      }
      .quality-products-heading {
        font-size: 2.2rem;
        margin-bottom: 1.3rem;
      }
      .quality-products-desc {
        font-size: 1.15rem;
        max-width: 90vw;
      }
    }
    @media (max-width: 700px) {
      .quality-products-section {
        padding-top: 2.2rem;
        padding-bottom: 2.2rem;
      }
      .quality-products-heading {
        font-size: 1.5rem;
        margin-bottom: 0.7rem;
      }
      .quality-products-desc {
        font-size: 1rem;
        max-width: 96vw;
        margin-bottom: 0.2rem;
      }
    }
    `}
  </style>
);

export default function QualityProducts() {
  return (
    <section className="quality-products-section">
      <QualityProductsFontAndStyle />
      <h2 className="quality-products-heading">
        Quality Products
      </h2>
      <p className="quality-products-desc">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do<br />
        eiusmod tempor incididunt ut labore et dolore magna aliqua.<br />
        Ut enim ad minim veniam, quis nostrud exercitation ullamco<br />
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </section>
  );
}