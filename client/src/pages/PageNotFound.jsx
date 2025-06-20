import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const PageNotFound = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <main className="grid min-h-full place-items-center bg-sec-gray px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-sec-dark-gray sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-base leading-7 text-sec-dark-gray/70">Sorry, we couldn't find the page you're looking for.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a href="/" className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Go back home</a>
          <a href="/contact" className="text-sm font-semibold text-sec-dark-gray">Contact support <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </main>
  )
}

export default PageNotFound;