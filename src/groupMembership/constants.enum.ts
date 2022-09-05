export enum ROLE {
  STUDENT = "Student",
}

export enum STATUS {
  NONE = "", // default status; i.e. assessment not yet done
  COMPLETED = "COMPLETED",
  ABSENT = "ABSENT", // student was absent
  NIPUN = "NIPUN", // student found to be NIPUN
  NIPUN_READY = "NIPUN_READY", // student found NIPUN_READY
}
