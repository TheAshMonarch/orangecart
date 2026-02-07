export default function AuthLeftPanel() {
  return (
    <div className="flex flex-1 flex-col justify-between px-10 py-12">
      <div>
        <h1 className="text-3xl font-semibold leading-tight">
          Success starts here
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/80">
          Join Fiverr to discover skilled freelancers and grow your business.
        </p>
      </div>

      <ul className="space-y-4 text-sm text-white/90">
        <li>✔ Over 700 categories</li>
        <li>✔ Quality freelancers</li>
        <li>✔ Secure payments</li>
      </ul>
    </div>
  );
}
