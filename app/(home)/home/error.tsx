"use client";

function Error({ statusCode } : {statusCode : number}) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold">
          {statusCode ? `An error ${statusCode} occurred` : 'An unexpected error occurred'}
        </h1>
      </div>
    );
  }
  
  Error.getInitialProps = ({ res, err } : any) => {
    const statusCode = res?.statusCode || err?.statusCode || 404;
    return { statusCode };
  };
  
  export default Error;
  