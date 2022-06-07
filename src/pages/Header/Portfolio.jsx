import React from "react";

const Portfolio = () => {
  return (
    <div className="card w-2/4 mx-auto mt-5 bg-base-300 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Md Ruhul Amin</h2>
        <p>
          <span className="font-bold text-xl"> Email:</span>
          <a href="mailto:ruhulamin.milon7@gmail.com">
            ruhuamin.milon7@gmail.com
          </a>
        </p>
        <p>
          <span className="font-bold text-xl">Educational Background:</span> HSC
        </p>
        <p className="font-bold text-xl">Skills</p>
        <ol>
          <li>Html</li>
          <li>Css</li>
          <li>JavaScript</li>
          <li>React</li>
        </ol>
        <div>
          <h3 className="font-bold text-xl">Project links:</h3>
          <p>
            <a href="https://cheerful-palmier-4962f2.netlify.app/">
              https://cheerful-palmier-4962f2.netlify.app/
            </a>
          </p>
          <p>
            <a href="https://stellar-cascaron-6ef892.netlify.app/">
              https://stellar-cascaron-6ef892.netlify.app/
            </a>
          </p>
          <p>
            <a href="https://rock-stone-11a9c.web.app">
              https://rock-stone-11a9c.web.app
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
