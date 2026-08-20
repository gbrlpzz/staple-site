export function IPhone({ children }: { children: React.ReactNode }) {
  return (
    <div className="hp-iphone-wrap">
      <div className="hp-iphone">
        <div className="hp-iphone-screen">
          <div className="hp-dynamic-island" aria-hidden="true" />
          {children}
          <div className="hp-home-indicator" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
