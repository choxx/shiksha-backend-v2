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
-- Name: monitortracking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.monitortracking (
    "monitorTrackingId" uuid DEFAULT public.gen_random_uuid() NOT NULL,
    "schoolId" text,
    "scheduleVisitDate" date,
    "visitDate" date,
    feedback text,
    status text,
    created_at timestamp with time zone DEFAULT now(),
    "monitorId" text,
    "lastVisited" date,
    updated_at timestamp with time zone DEFAULT now(),
    "groupId" uuid NOT NULL
);


ALTER TABLE public.monitortracking OWNER TO postgres;

--
-- Name: COLUMN monitortracking."scheduleVisitDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.monitortracking."scheduleVisitDate" IS 'The date at which team is scheduled to arrive (sa_school_evaluations.evaluation_date, sa_school_evaluations.school_id, sa_school_evaluations.evaluator_ids to be matched)';


--
-- Name: COLUMN monitortracking."visitDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.monitortracking."visitDate" IS 'actual date of visit done by evaluator';


--
-- Name: monitortracking monitortracking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monitortracking
    ADD CONSTRAINT monitortracking_pkey PRIMARY KEY ("monitorTrackingId");


--
-- Name: monitortracking set_public_monitortracking_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_monitortracking_updated_at BEFORE UPDATE ON public.monitortracking FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_monitortracking_updated_at ON monitortracking; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_monitortracking_updated_at ON public.monitortracking IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: monitortracking monitortracking_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monitortracking
    ADD CONSTRAINT "monitortracking_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."group"("groupId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

