--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.23
-- Dumped by pg_dump version 9.6.23

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: sa_class_students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sa_class_students (
    id integer NOT NULL,
    school_id integer NOT NULL,
    class integer NOT NULL,
    student_id integer NOT NULL,
    evaluation_date date NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.sa_class_students OWNER TO postgres;

--
-- Name: TABLE sa_class_students; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.sa_class_students IS 'table to store list of students whose spot assessment will be conducted';


--
-- Name: sa_class_evaluation_students_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sa_class_evaluation_students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sa_class_evaluation_students_id_seq OWNER TO postgres;

--
-- Name: sa_class_evaluation_students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sa_class_evaluation_students_id_seq OWNED BY public.sa_class_students.id;


--
-- Name: sa_class_students id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_class_students ALTER COLUMN id SET DEFAULT nextval('public.sa_class_evaluation_students_id_seq'::regclass);


--
-- Name: sa_class_students sa_class_evaluation_students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_class_students
    ADD CONSTRAINT sa_class_evaluation_students_pkey PRIMARY KEY (id);


--
-- Name: sa_class_students sa_class_evaluation_students_school_id_class_student_id_eva_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_class_students
    ADD CONSTRAINT sa_class_evaluation_students_school_id_class_student_id_eva_key UNIQUE (school_id, class, student_id, evaluation_date);


--
-- Name: sa_class_students sa_class_evaluation_students_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_class_students
    ADD CONSTRAINT sa_class_evaluation_students_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: sa_class_students sa_class_evaluation_students_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sa_class_students
    ADD CONSTRAINT sa_class_evaluation_students_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

