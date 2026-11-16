export type LabStatus = "demonstration" | "planned";

export type LabExperiment = {
  slug: string;
  title: string;
  question: string;
  status: LabStatus;
  summary: string;
};

// Lab entries describe engineering concepts. A "demonstration" runs in the
// browser and shows the algorithm; it is not a production system or a project
// of the owner's. "planned" entries have no implementation yet.
export const labExperiments: LabExperiment[] = [
  {
    slug: "token-bucket",
    title: "Token bucket rate limiter",
    question: "How does a bucket of tokens decide which requests to accept?",
    status: "demonstration",
    summary: "A browser implementation of a token bucket. Send requests and watch tokens drain and refill.",
  },
  {
    slug: "concurrent-workers",
    title: "Concurrent workers",
    question: "What happens to queued jobs when the number of workers is limited?",
    status: "planned",
    summary: "Jobs flowing through a fixed pool of workers. Not yet built.",
  },
  {
    slug: "grpc-streaming",
    title: "gRPC streaming",
    question: "How do messages move between a client and a service over one stream?",
    status: "planned",
    summary: "Messages passing between services over a streaming connection. Not yet built.",
  },
  {
    slug: "query-path",
    title: "Database query path",
    question: "Where does a query spend its time as it passes through system components?",
    status: "planned",
    summary: "A query moving through the components of a system. Not yet built.",
  },
];
