import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { ArrowRight, Globe, Info } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-6">
        <div className="text-center space-y-4">
          <Globe className="size-16 text-blue-500 mx-auto" />
          <h1 className="text-4xl font-bold text-white">WEB EXPLAIN</h1>
          <p className="text-zinc-400 text-lg">
            Chat with any website by adding its URL to the address bar
          </p>
        </div>

        <Card className="bg-zinc-800 border border-zinc-700">
          <CardHeader className="flex gap-3">
            <Info className="size-6 text-blue-500" />
            <h2 className="text-xl font-semibold text-white">How to Use</h2>
          </CardHeader>
          <CardBody className="text-zinc-300">
            <ol className="space-y-4">
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-500">1.</span>
                Add the website URL after the current address:
                <code className="bg-zinc-900 px-2 py-1 rounded text-blue-400 ml-1">
                  localhost:3000/example.com
                </code>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-500">2.</span>
                The assistant will read the website content and be ready to answer your questions about it
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-500">3.</span>
                Start chatting and asking questions about the website content
              </li>
            </ol>
          </CardBody>
        </Card>

        <Card className="bg-zinc-800 border border-zinc-700">
          <CardHeader className="flex gap-3">
            <ArrowRight className="size-6 text-blue-500" />
            <h2 className="text-xl font-semibold text-white">Try These Examples</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <p className="text-zinc-300 mb-2">Want to learn about artificial intelligence?</p>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">Try:</span>
                  <code className="bg-zinc-900 px-3 py-1.5 rounded-md text-blue-400">
                    localhost:3000/wikipedia.org/wiki/Artificial_intelligence
                  </code>
                </div>
              </div>
              
              <div>
                <p className="text-zinc-300 mb-2">Interested in space exploration?</p>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">Try:</span>
                  <code className="bg-zinc-900 px-3 py-1.5 rounded-md text-blue-400">
                    localhost:3000/nasa.gov/solar-system
                  </code>
                </div>
              </div>
              
              <div>
                <p className="text-zinc-300 mb-2">Looking for cooking inspiration?</p>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">Try:</span>
                  <code className="bg-zinc-900 px-3 py-1.5 rounded-md text-blue-400">
                    localhost:3000/foodnetwork.com/recipes
                  </code>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}