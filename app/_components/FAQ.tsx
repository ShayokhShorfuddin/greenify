import { Accordion } from "@szhsin/react-accordion";
import Image from "next/image";
import undraw_tree from "@/public/svgs/undraw_tree.svg";
import AnimatedAccordionItem from "./AnimatedAccordionItem";

// TODO: Add more FAQs
const information = [
  {
    header: "There are existing solutions out there. Why another one?",
    content:
      "We are aware of existing solutions and, in fact, we use some of them ourselves. However, none offer a feature-rich, open-source, complete solution. Think of it as scattered pieces of a puzzle that we are determined to put together.",
  },
  {
    header: "How accurate are the generated results?",
    content:
      "We strive for high accuracy, but results may vary based on multiple factors, such as internet connectivity, host server configurations, availability of our third-party services, etc. Consider auditing sites every now and then to ensure everything is in order.",
  },
];

export default function FAQ() {
  return (
    <section className="flex justify-center mt-[3rem] font-sans">
      <div className="relative w-full max-w-[46rem] px-5">
        <p className="text-base sm:text-xl font-medium">
          Frequently Asked Questions.
        </p>

        <Accordion
          transition
          allowMultiple
          transitionTimeout={200}
          className="w-full mt-[.5rem] border border-green-400 rounded-2xl"
        >
          {information.map(({ header, content }, i) => (
            // `transitionTimeout` prop should be equal to the transition duration in CSS
            // biome-ignore lint/suspicious/noArrayIndexKey: <Order of items will not change>
            <AnimatedAccordionItem header={header} key={i}>
              {content}
            </AnimatedAccordionItem>
          ))}
        </Accordion>

        {/* Cutie little tree */}
        <Image
          src={undraw_tree}
          alt="Tree Illustration"
          className="hidden xs:block absolute right-8 xs:top-0 sm:top-1 size-8"
        />
      </div>
    </section>
  );
}
