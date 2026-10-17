import { Button } from '@/components/ui';
export default function NotFound() {
  return (
    <section className="section"><div className="wrap wrap--narrow" style={{ display: 'grid', gap: 18, textAlign: 'center', justifyItems: 'center' }}>
      <span className="lg-eyebrow">404</span>
      <h1 className="h1">This page took a wrong turn.</h1>
      <p className="lead">The lesson or page you wanted isn’t here. The path is a good place to restart.</p>
      <div className="row" style={{ justifyContent: 'center' }}><Button href="/path" trailingIcon="arrow">Open the path</Button><Button href="/" variant="secondary">Home</Button></div>
    </div></section>
  );
}
