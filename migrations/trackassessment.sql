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
-- Name: trackassessment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trackassessment (
    "trackAssessmentId" uuid DEFAULT public.gen_random_uuid() NOT NULL,
    filter text,
    type text,
    questions text,
    source text,
    score text,
    "totalScore" text,
    "studentId" text NOT NULL,
    "teacherId" text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    answersheet text,
    subject text,
    date date DEFAULT now(),
    status text,
    "groupId" uuid,
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.trackassessment OWNER TO postgres;

--
-- Name: trackassessment trackassessment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trackassessment
    ADD CONSTRAINT trackassessment_pkey PRIMARY KEY ("trackAssessmentId");


--
-- Name: trackassessment set_public_trackassessment_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_trackassessment_updated_at BEFORE UPDATE ON public.trackassessment FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_trackassessment_updated_at ON trackassessment; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_trackassessment_updated_at ON public.trackassessment IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: trackassessment trackassessment_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trackassessment
    ADD CONSTRAINT "trackassessment_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."group"("groupId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

