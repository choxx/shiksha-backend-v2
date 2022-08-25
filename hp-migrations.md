## ADD `monitortracking` table
```
CREATE TABLE IF NOT EXISTS monitortracking
(
    "monitorTrackingId" uuid NOT NULL DEFAULT gen_random_uuid(),
    "schoolId" text,
    "scheduleVisitDate" date,
    "visitDate" date,
    feedback text,
    status text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    "monitorId" text,
    "groupId" text,
    "lastVisited" date,
    CONSTRAINT monitortracking_pkey PRIMARY KEY ("monitorTrackingId")
)
```

## ADD `worksheet` table
```
CREATE TABLE IF NOT EXISTS worksheet
(
    "worksheetId" uuid NOT NULL DEFAULT gen_random_uuid(),
    name text,
    state text,
    subject text,
    grade text,
    level text,
    instructions text,
    feedback jsonb,
    hints jsonb,
    "navigationMode" text,
    "timeLimits" text,
    "showHints" text,
    questions jsonb,
    "questionSets" jsonb,
    "outcomeDeclaration" jsonb,
    "outcomeProcessing" jsonb,
    "questionSetType" text,
    criteria text,
    "usedFor" text,
    purpose text,
    visibility text,
    "qumlVersion" text,
    topic jsonb,
    source text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT worksheet_pkey PRIMARY KEY ("worksheetId")
)
```

## ADD `workhistory` table
```
CREATE TABLE IF NOT EXISTS workhistory
(
    "workHistoryId" uuid NOT NULL DEFAULT gen_random_uuid(),
    "userId" text,
    role text,
    "joiningDesignation" text,
    "leavingDesignation" text,
    "dateOfJoining" date,
    "dateOfRelieving" date,
    reason text,
    remark text,
    cadre text,
    "transferOrderNumber" text,
    "placeOfPosting" text,
    "dateOfOrder" date,
    "modeOfPosting" text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    "organizationName" text,
    CONSTRAINT workhistory_pkey PRIMARY KEY ("workHistoryId")
)
```

## ADD `trackassessment` table
```
CREATE TABLE IF NOT EXISTS trackassessment
(
    "trackAssessmentId" uuid NOT NULL DEFAULT gen_random_uuid(),
    filter text,
    type text,
    questions text,
    source text,
    score text,
    "totalScore" text,
    "studentId" text NOT NULL,
    "teacherId" text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    answersheet text,
    "groupId" text,
    subject text,
    date date DEFAULT now(),
    "studentAssessmentStatus" text,
    CONSTRAINT trackassessment_pkey PRIMARY KEY ("trackAssessmentId")
)
```

##  ADD `role` table
```
CREATE TABLE IF NOT EXISTS role
(
    "roleId" uuid NOT NULL DEFAULT gen_random_uuid(),
    title text NOT NULL,
    "parentId" text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    status text,
    CONSTRAINT role_pkey PRIMARY KEY ("roleId"),
    CONSTRAINT role_title_key UNIQUE (title)
)
```

## ADD `monitortracking` table
```
CREATE TABLE IF NOT EXISTS monitortracking
(
    "monitorTrackingId" uuid NOT NULL DEFAULT gen_random_uuid(),
    "schoolId" text,
    "scheduleVisitDate" date,
    "visitDate" date,
    feedback text,
    status text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    "monitorId" text,
    "groupId" text,
    "lastVisited" date,
    CONSTRAINT monitortracking_pkey PRIMARY KEY ("monitorTrackingId")
)
```

## ADD `mentortracking` table
```
CREATE TABLE IF NOT EXISTS mentortracking
(
    "mentorTrackingId" uuid NOT NULL DEFAULT gen_random_uuid(),
    "mentorId" text,
    "teacherId" text,
    "scheduleVisitDate" date,
    "visitDate" date,
    feedback text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    "schoolId" text,
    "lastVisited" date,
    status text,
    CONSTRAINT mentortracking_pkey PRIMARY KEY ("mentorTrackingId"),
    CONSTRAINT "mentortracking_mentorTracking_key" UNIQUE ("mentorTrackingId")
)
```

## ADD `group` table
```
CREATE TABLE IF NOT EXISTS "group"
(
    "groupId" uuid NOT NULL DEFAULT gen_random_uuid(),
    "schoolId" text,
    name text,
    type text,
    section text,
    status text,
    "deactivationReason" text,
    "mediumOfInstruction" text,
    image text,
    "metaData" jsonb,
    option jsonb,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    "teacherId" text,
    "gradeLevel" text,
    CONSTRAINT group_pkey PRIMARY KEY ("groupId")
)
```

## ADD `coursetracking` table
```
CREATE TABLE IF NOT EXISTS coursetracking
(
    "courseTrackingId" uuid NOT NULL DEFAULT gen_random_uuid(),
    "courseId" text,
    "userId" text,
    "progressDetail" text,
    "startTime" text,
    "endTime" text,
    certificate text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    status text,
    date date DEFAULT now(),
    "contentIds" jsonb,
    source text,
    CONSTRAINT coursetracking_pkey PRIMARY KEY ("courseTrackingId")
)
```

## ADD `assessmentset` table
```
CREATE TABLE IF NOT EXISTS assessmentset
(
    "assessmentsetId" uuid NOT NULL DEFAULT gen_random_uuid(),
    title text,
    type text,
    "typeDetails" text,
    "gradeType" text,
    options text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT assessmentset_pkey PRIMARY KEY ("assessmentsetId")
)
```

