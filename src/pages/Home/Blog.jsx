import React from "react";

const Blog = () => {
  return (
    <div className="w-3/4 mx-auto">
      <div className="my-5">
        <h1 className="text-3xl font-bold">
          Different ways to to manage state in react
        </h1>
        <ol>
          <li>local state with useState() useReducer()</li>
          <li>
            for global state context Api or third party library like Zustand,
            Jotai, recoil
          </li>
          <li>server state with swr React Query</li>

          <li>url state with useHistory or useLocation</li>
        </ol>
      </div>
      <div className="mt-5">
        <h2 className="text-3xl font-bold">
          Why you do not set the state directly in React?
        </h2>
        <p>
          We do not set the state directly in react because if we set the state
          directly any change of the state won't update in ui. but if we use
          useState hook any changes of that state is updated in ui.
        </p>
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-bold">
          You have an array of products. Each product has a name, price,
          description, etc. How will you implement a search to find products by
          name?
        </h2>
        <p>with find() method we can easily find the product by name</p>
        <code>
          {`

        const products=[
          {
            'name':'abc,
          }
          {
            'name':'bcd',
          }
        ]

        const find='bcd'
        const product=products.find(product=>product.name===find)

          `}
        </code>
      </div>
      <div className="mt-5">
        <h2 className="text-3xl font-bold">What is unit test?</h2>
        <p>
          Unit testing involves testing individual components of the software
          program or application. The main purpose behind this is to check that
          all the individual parts are working as intended. A unit is known as
          the smallest possible component of software that can be tested.
          Generally, it has a few inputs and a single output.
        </p>
        <h2 className="text-3xl font-bold">Why should write unit tests?</h2>
        <p>
          Unit tests save time and money. Usually, we tend to test the happy
          path more than the unhappy path. If you release such an app without
          thorough testing, you would have to keep fixing issues raised by your
          potential users. The time to fix these issues could’ve been used to
          build new features or optimize the existing system. Bear in mind that
          fixing bugs without running tests could also introduce new bugs into
          the system.
        </p>
        <p>
          Well-written unit tests act as documentation for your code. Any
          developer can quickly look at your tests and know the purpose of your
          functions.
        </p>
        <p>It simplifies the debugging process.</p>
        <p>
          Unit testing is an integral part of extreme programming. Extreme
          programming is basically a “test-everything-that-can-possibly-break”
          programming strategy.
        </p>
        <p>
          Unit testing is an integral part of extreme programming. Extreme
          programming is basically a “test-everything-that-can-possibly-break”
          programming strategy.
        </p>
      </div>
    </div>
  );
};

export default Blog;
