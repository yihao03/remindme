interface ContentItem {
  type: "paragraph" | "header" | "list" | "link" | "table";
  text?: string;
  items?: string[];
  url?: string;
  note?: string;
}

interface Subsection {
  title: string;
  content: ContentItem[];
}

interface Section {
  title: string;
  summary: string;
  id: number;
  subsections: Subsection[];
}

type SectionListView = Omit<Section, "subsections">;

interface EducationData {
  sections: Section[];
}

export { ContentItem, Subsection, Section, SectionListView, EducationData };
