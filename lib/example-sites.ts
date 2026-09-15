import type { ComponentType } from "react";
import type { PreviewSlug } from "@/lib/preview";
import Bakehouse from "@/examples/bakery/Site";
import Physio from "@/examples/physio/Site";
import Accountancy from "@/examples/accountancy/Site";
import Harbourline from "@/examples/harbourline/Site";
import Ironbark from "@/examples/ironbark/Site";
import Ballast from "@/examples/ballast/Site";
import Halfway from "@/examples/halfway/Site";
import Ellery from "@/examples/ellery/Site";
import Hartwell from "@/examples/hartwell/Site";
import Walsh from "@/examples/walsh/Site";
import Sancrox from "@/examples/sancrox/Site";

export const examples: Record<PreviewSlug, ComponentType> = {
  "proof-room": Bakehouse,
  "ridgeway-physio": Physio,
  "marlow-finch": Accountancy,
  harbourline: Harbourline,
  ironbark: Ironbark,
  ballast: Ballast,
  halfway: Halfway,
  ellery: Ellery,
  hartwell: Hartwell,
  walsh: Walsh,
  sancrox: Sancrox,
};

export const previewNames: Record<PreviewSlug, string> = {
  "proof-room": "Bakehouse",
  "ridgeway-physio": "Ridgeway Physiotherapy",
  "marlow-finch": "Rowe Accounting",
  harbourline: "Harbourline Environmental",
  ironbark: "Ironbark",
  ballast: "Parkside Gym",
  halfway: "Halfway House",
  ellery: "Ellery Lawyers",
  hartwell: "Hartwell Constructions",
  walsh: "Walsh Mathematics",
  sancrox: "Sancrox Civil",
};
