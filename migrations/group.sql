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
-- Name: group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."group" (
    "groupId" uuid DEFAULT public.gen_random_uuid() NOT NULL,
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
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    "teacherId" text,
    "gradeLevel" text,
    updated_at timestamp with time zone DEFAULT now(),
    "parentId" uuid
);


ALTER TABLE public."group" OWNER TO postgres;

--
-- Name: group group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT group_pkey PRIMARY KEY ("groupId");


--
-- Name: group set_public_group_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_group_updated_at BEFORE UPDATE ON public."group" FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_group_updated_at ON "group"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_group_updated_at ON public."group" IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: group group_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT "group_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."group"("groupId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

