import Image from "next/image";

const SHOWDOWN_URL = "https://valforumstreamershowdown2.netlify.app/";

type StreamerShowdownLinkProps = {
  className?: string;
};

export default function StreamerShowdownLink({
  className = "h-12 w-12"
}: StreamerShowdownLinkProps) {
  return (
    <a
      href={SHOWDOWN_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Valforum Streamer Showdown Vol. 2"
      className="inline-flex shrink-0 items-center"
    >
      <Image
        src="/header/valforum-streamer-showdown-vol-2.svg"
        alt=""
        width={1350}
        height={1350}
        unoptimized
        className={`object-contain ${className}`}
      />
    </a>
  );
}
