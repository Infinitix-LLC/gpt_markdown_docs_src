import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function InstallationPage() {
  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
        Installation
      </h1>
      <p className="leading-7">
        Adding GPT Markdown to your Flutter project is straightforward. Follow
        these steps to get started.
      </p>

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Requirements
      </h2>
      <p className="leading-7">
        Before installing GPT Markdown, ensure your Flutter project meets these
        requirements:
      </p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>Flutter SDK version 3.0.0 or higher</li>
        <li>Dart SDK version 2.17.0 or higher</li>
      </ul>

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Adding the Dependency
      </h2>
      <p className="leading-7">
        You can add GPT Markdown to your project using either Flutter&apos;s CLI tool
        or by manually editing your pubspec.yaml file:
      </p>

      <div className="my-6 w-full overflow-y-auto">
        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="cli">Flutter CLI</TabsTrigger>
            <TabsTrigger value="yaml">pubspec.yaml</TabsTrigger>
          </TabsList>
          <TabsContent value="cli" className="rounded-md bg-slate-950 p-4">
            <pre className="text-sm text-white overflow-x-auto">
              <code>{`flutter pub add gpt_markdown`}</code>
            </pre>
          </TabsContent>
          <TabsContent value="yaml" className="rounded-md bg-slate-950 p-4">
            <pre className="text-sm text-white overflow-x-auto">
              <code>{`dependencies:
  flutter:
    sdk: flutter
  gpt_markdown: ^1.0.0`}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </div>

      <p className="leading-7">
        After adding the dependency, run{" "}
        <code className="bg-muted rounded px-1">flutter pub get</code> to
        install the package.
      </p>

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Optional Dependencies
      </h2>
      <p className="leading-7">
        GPT Markdown has some optional features that require additional
        packages:
      </p>

      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        LaTeX Support
      </h3>
      <p className="leading-7">
        For LaTeX math rendering, ensure you have the following dependency:
      </p>
      <div className="my-6 w-full overflow-y-auto rounded-md bg-slate-950 p-4">
        <pre className="text-sm text-white">
          <code>{`dependencies:
  flutter_math_fork: ^0.7.0`}</code>
        </pre>
      </div>

      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Syntax Highlighting
      </h3>
      <p className="leading-7">
        For code syntax highlighting, ensure you have:
      </p>
      <div className="my-6 w-full overflow-y-auto rounded-md bg-slate-950 p-4">
        <pre className="text-sm text-white">
          <code>{`dependencies:
  flutter_highlight: ^0.7.0`}</code>
        </pre>
      </div>

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Import the Package
      </h2>
      <p className="leading-7">
        After installing, you can import GPT Markdown in your Dart files:
      </p>
      <div className="my-6 w-full overflow-y-auto rounded-md bg-slate-950 p-4">
        <pre className="text-sm text-white">
          <code>{`import 'package:gpt_markdown/gpt_markdown.dart';`}</code>
        </pre>
      </div>

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Verify Installation
      </h2>
      <p className="leading-7">
        To verify that GPT Markdown is correctly installed, you can create a
        simple test widget:
      </p>
      <div className="my-6 w-full overflow-y-auto rounded-md bg-slate-950 p-4">
        <pre className="text-sm text-white">
          <code>{`import 'package:flutter/material.dart';
import 'package:gpt_markdown/gpt_markdown.dart';

class TestWidget extends StatelessWidget {
  const TestWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return const GPTMarkdown(
      markdownText: "# Hello from GPT Markdown!",
    );
  }
}`}</code>
        </pre>
      </div>

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Next Steps
      </h2>
      <p className="leading-7">
        Now that you have installed GPT Markdown, you can start using it in your
        Flutter app. Continue to the Basic Usage section to learn how to
        implement the package in your application.
      </p>

      <div className="flex justify-between items-center mt-8">
        <a
          href="/docs"
          className="text-primary hover:underline inline-flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="mr-1 h-4 w-4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Getting Started
        </a>
        <a
          href="/docs/usage"
          className="text-primary hover:underline inline-flex items-center">
          Basic Usage
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="ml-1 h-4 w-4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
