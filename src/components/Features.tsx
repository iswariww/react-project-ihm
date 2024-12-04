import React from "react";
import { Cloud, Brain, Shield, Cpu, Link, HeadphonesIcon } from "lucide-react";

const features = [
  {
    title: "Cloud Integration",
    description:
      "Seamlessly integrate your systems with our advanced cloud solutions for enhanced scalability and flexibility.",
    icon: Cloud,
  },
  {
    title: "AI-Powered Analytics",
    description:
      "Harness the power of artificial intelligence to gain deep insights and make data-driven decisions.",
    icon: Brain,
  },
  {
    title: "Cybersecurity Suite",
    description:
      "Protect your digital assets with our comprehensive cybersecurity measures and real-time threat detection.",
    icon: Shield,
  },
  {
    title: "IoT Ecosystem",
    description:
      "Connect and manage your IoT devices effortlessly with our robust IoT ecosystem management tools.",
    icon: Cpu,
  },
  {
    title: "Blockchain Solutions",
    description:
      "Leverage blockchain technology for secure, transparent, and efficient business processes.",
    icon: Link,
  },
  {
    title: "24/7 Expert Support",
    description:
      "Get round-the-clock support from our team of experienced professionals to ensure smooth operations.",
    icon: HeadphonesIcon,
  },
];

const Features: React.FC = () => {
  return (
    <div className="bg-gray-100" id="features">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Our Features
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Discover the cutting-edge solutions that set TechNova apart.
          </p>
        </div>
        <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
          {features.map((feature) => (
            <div key={feature.title} className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  {feature.title}
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Features;
