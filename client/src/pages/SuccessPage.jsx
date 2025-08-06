import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <section>
      <h2>Thanks!</h2>
      <Link to="/">return to shop</Link>
    </section>
  );
};

export default SuccessPage;
