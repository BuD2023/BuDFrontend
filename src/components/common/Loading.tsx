import { ColorRing } from 'react-loader-spinner';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-darkNavy">
      <ColorRing height="80" width="80" colors={['green', 'red', 'green', 'green', 'green']} ariaLabel="loading" />
    </div>
  );
}
