import { ApiPromise } from "@/types/network";
import BaseAPI from "./base";
import { Section, SectionListView } from "@/types/education";

class EducationAPI extends BaseAPI {
  private getEducationUrl() {
    return "/educations";
  }

  public getEducationList(): ApiPromise<SectionListView> {
    return this.get(this.getEducationUrl());
  }

  public getEducationSection(SectionId: number): ApiPromise<Section> {
    return this.get(`${this.getEducationUrl()}/${SectionId}`);
  }
}

export default EducationAPI;
