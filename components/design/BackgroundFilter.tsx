const BackgroundFilter = () => (
    <div className="-z-10 !mb-0  fixed inset-0 lg:rounded-4xl">
      {/* Top-left pink ball */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-custom-purple rounded-br-full mix-blend-screen filter blur-[100px] opacity-40" />

      {/* Bottom-right sky-blue ball */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-custom-purple rounded-tl-full mix-blend-screen filter blur-[100px] opacity-40" />

      {/* Middle gradient line */}
      <div className="absolute invert top-0 w-[75%] left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-custom-baby-pink via-custom-pink to-custom-sky-blue" />
    </div>
  );

  export default BackgroundFilter;

  