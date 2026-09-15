import type { ComponentType } from "react";
import type { PreviewSlug } from "@/lib/preview";
import Bakehouse from "@/examples/bakery/Site";
import Physio from "@/examples/physio/Site";
import Accountancy from "@/examples/accountancy/Site";
import Harbourline from "@/examples/harbourline/Site";
import Ironbark from "@/examples/ironbark/Site";
import Ballast from "@/examples/ballast/Site";
import Halfway from "@/examples/halfway/Site";
import Hartwell from "@/examples/hartwell/Site";
import Walsh from "@/examples/walsh/Site";

export const examples: Record<PreviewSlug, ComponentType> = {
  "proof-room": Bakehouse,
  "ridgeway-physio": Physio,
  "marlow-finch": Accountancy,
  harbourline: Harbourline,
  ironbark: Ironbark,
  ballast: Ballast,
  halfway: Halfway,
  hartwell: Hartwell,
  walsh: Walsh,
};

export const previewNames: Record<PreviewSlug, string> = {
  "proof-room": "The Bakehouse",
  "ridgeway-physio": "Ridgeway Physiotherapy",
  "marlow-finch": "Rowe Accounting",
  harbourline: "Harbourline Environmental",
  ironbark: "Ironbark",
  ballast: "Parkside Gym",
  halfway: "Halfway House",
  hartwell: "Hartwell Constructions",
  walsh: "Walsh Mathematics",
};
