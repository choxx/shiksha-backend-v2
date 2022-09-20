CREATE TABLE public.sa_class_students (
    id integer NOT NULL,
    school_id integer NOT NULL,
    class integer NOT NULL,
    student_id integer NOT NULL,
    evaluation_date date NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.sa_class_students IS 'table to store list of students whose spot assessment will be conducted';

CREATE SEQUENCE public.sa_class_evaluation_students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE ONLY public.sa_class_students ALTER COLUMN id SET DEFAULT nextval('public.sa_class_evaluation_students_id_seq'::regclass);

ALTER TABLE ONLY public.sa_class_students
    ADD CONSTRAINT sa_class_evaluation_students_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.sa_class_students
    ADD CONSTRAINT sa_class_evaluation_students_school_id_class_student_id_eva_key UNIQUE (school_id, class, student_id, evaluation_date);

ALTER TABLE ONLY public.sa_class_students
    ADD CONSTRAINT sa_class_evaluation_students_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY public.sa_class_students
    ADD CONSTRAINT sa_class_evaluation_students_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(id) ON UPDATE CASCADE ON DELETE RESTRICT;