URL: https://nationalarchives.github.io/ds-find-caselaw-docs/public#tag/Reading-documents/operation/atomFeed
---
- Open Justice Licence
- Give us your feedback
- Reading documents
  - Detecting content changes
  - getGet a Atom feed of documents
  - getGet a single document
  - getGet a list of recently published or updated documents

[API docs by Redocly](https://redocly.com/redoc/)

# National Archives Find Case Law: Public API (0.2.0)

Download OpenAPI specification: [Download](blob:https://nationalarchives.github.io/1ab08d26-ca96-4ee5-ad35-076756827867)

Find Case Law: [caselaw@nationalarchives.gov.uk](mailto:caselaw@nationalarchives.gov.uk)URL: [https://caselaw.nationalarchives.gov.uk/](https://caselaw.nationalarchives.gov.uk/)License: [Open Justice Licence](https://caselaw.nationalarchives.gov.uk/open-justice-licence)[Terms of Service](https://caselaw.nationalarchives.gov.uk/terms-of-use)

The Find Case Law API allows you to access court judgments and tribunal decisions held in the [Find Case Law service](https://caselaw.nationalarchives.gov.uk/), operated by the National Archives.

Our API provides access to judgments and decisions held by Find Case Law that have been converted from Microsoft Word documents into XML. These have been automatically marked up according to the [international data standard, LegalDocML](https://groups.oasis-open.org/communities/tc-community-home2?CommunityKey=3425f20f-b704-4076-9fab-018dc7d3efbe), and validated by our legal editorial team. This data includes:

- Neutral Citation
- Court / Chamber
- Date
- Case Name
- Party Names
- Judges' Names

## [section/Open-Justice-Licence](https://nationalarchives.github.io/ds-find-caselaw-docs/public\#section/Open-Justice-Licence) Open Justice Licence

The National Archives has worked in collaboration with The Ministry of Justice and the Judicial Executive Board to design a new licensing framework for the reuse of case law as data. The [Open Justice licence](https://caselaw.nationalarchives.gov.uk/open-justice-licence) is designed to protect the personal data within the records while supporting the principles of Open Justice.

The Open Justice licence allows you to copy, publish, distribute and transmit case law data. It permits you to use the data commercially, for example, by combining it with other information, or by including it in your own product or application. There are certain conditions that apply under this licence.

You do not need to apply to re-use Find Case Law records if your re-use complies with the terms and conditions of the Open Justice Licence.

**The Open Justice licence does not permit computational analysis.** If you intend to do any programmatic searching in bulk across the Find Case Law records to identify, extract or enrich contents within the records you will need to [apply to perform computational analysis](https://caselaw.nationalarchives.gov.uk/re-use-find-case-law-records/licence-application-process). There are no application charges.

## [section/Give-us-your-feedback](https://nationalarchives.github.io/ds-find-caselaw-docs/public\#section/Give-us-your-feedback) Give us your feedback

We are still actively developing Find Case Law based on user feedback. This includes improving the experience of how data re-users can access the data.

You can provide feedback by using our [feedback form](https://corexmsnp4n42lf2kht3.qualtrics.com/jfe/form/SV_0lyyYAzfv9bGcyW).

## [tag/Reading-documents](https://nationalarchives.github.io/ds-find-caselaw-docs/public\#tag/Reading-documents) Reading documents

## [tag/Reading-documents/Detecting-content-changes](https://nationalarchives.github.io/ds-find-caselaw-docs/public\#tag/Reading-documents/Detecting-content-changes) Detecting content changes

Whenever a judgment gets changed it appears in the recently published list. This includes minor updates such as when we enrich the document with hyperlinks to other legal citations, as well as more significant changes such as revisions we have received from the courts.

Both the Atom feed and the judgment XML include a content hash so that you can check if the text of the document has changed.

## [tag/Reading-documents/operation/atomFeed](https://nationalarchives.github.io/ds-find-caselaw-docs/public\#tag/Reading-documents/operation/atomFeed) Get a Atom feed of documents

Without any parameters, this will give the most recently handed down judgments and decisions. The parameters used are identical to
those used for the advanced search at [https://caselaw.nationalarchives.gov.uk/judgments/search](https://caselaw.nationalarchives.gov.uk/judgments/search): a link to the feed mirroring those
search results is available on each search result.

Each differently named parameter filters out documents that do not match it.

The feed has multiple pages (see the `link` tag with a `rel` attribute of `next` for the next page).

Each `entry` tag contains a different document's metadata. Notable tags include:

- `<tna:contenthash>`: A hash of the text in the judgment, with whitespace removed. Can be used to determine if the underlying judgment text has changed.
- `<link type="application/akn+xml">`: A link to the XML of the judgment
- `<link type="application/pdf">`: A link to the PDF of the judgment

##### query Parameters

|     |     |
| --- | --- |
| query | string<br>Full text search of a judgment. `"financial records"` will only find judgments with those two words in that order. Multiple<br>space-separated words will only find judgments that have all those words. |
| court | string<br>A court code. Currently there are two forms of court code, one used in the URL structure ( `ewhc/fam`) and one used in the XML<br>court tag `EWHC-Family`. Either can be searched for. If multiple courts or tribunals are given, results from all those courts<br>may be returned. |
| tribunal | string<br>A tribunal. Identical to the court codes above. |
| party | string<br>A full-match for a word in the name of a party to the judgment. |
| judge | string<br>A full-match for a word in the name of a judge or similar involved in the judgment |
| order | string<br>Default: "-date"<br>Enum:"date""-date""updated""-updated""transformation""-transformation"<br>Which of the dates within the document to use for ordering. Prepend a `-` to sort by newest first.<br>- `date`: The date the document was first published by the court<br>- `updated`: The last date the document was updated in the Find Case Law system, including changes to its metadata<br>- `transformation`: The date the body of the document was last modified, including changes to either the body text, XML markup, or both |
| page | integer >= 1 <br>Default: 1<br>Where results are across multiple pages, the page of results to return. |
| per\_page | integer<br>Default: 50<br>How many results to list per page. |

### Responses

**200**

An Atom feed of documents, sorted by one of the dates within those documents.

get/atom.xml

Find Case Law

https://caselaw.nationalarchives.gov.uk/atom.xml

## [tag/Reading-documents/operation/getDocumentByUri](https://nationalarchives.github.io/ds-find-caselaw-docs/public\#tag/Reading-documents/operation/getDocumentByUri) Get a single document

Retrieve the XML of a single document based on its identifier.

##### path Parameters

|     |     |
| --- | --- |
| document\_uri<br>required | string<br>Example: ewhc/tcc/2022/42<br>The unique identifier for this document within Find Case Law. |

### Responses

**200**

The contents of a single document, as [Akoma Ntoso XML](https://www.oasis-open.org/standard/akn-v1-0/).

get/{document\_uri}/data.xml

Find Case Law

https://caselaw.nationalarchives.gov.uk/{document\_uri}/data.xml

## [tag/Reading-documents/operation/listJudgments](https://nationalarchives.github.io/ds-find-caselaw-docs/public\#tag/Reading-documents/operation/listJudgments) Get a list of recently published or updated documents  Deprecated

Deprecated -- will now redirect to `/atom.xml` with relevant parameters

Less specific feeds can be gained by omitting the components e.g. `/`, `/2022/`, `/ewhc/` and `/ewhc/ch/` are all valid prefixes to `atom.xml`.

Note that a `{court}` is required if there is a `{subdivision}`.

##### path Parameters

|     |     |
| --- | --- |
| court<br>required | string<br>Example: ewca<br>The court code to return results for. |
| subdivision<br>required | string<br>Example: pat<br>The court subdivision code to return results for. |
| year<br>required | integer<br>Example: 2022<br>The year to return results for. |

##### query Parameters

|     |     |
| --- | --- |
| order | string<br>Default: "-date"<br>Enum:"date""-date""updated""-updated""transformation""-transformation"<br>Which of the dates within the document to use for ordering. Prepend a `-` to sort by newest first.<br>- `date`: The date the document was first published by the court<br>- `updated`: The last date the document was updated in the Find Case Law system, including changes to its metadata<br>- `transformation`: The date the body of the document was last modified, including changes to either the body text, XML markup, or both |
| page | integer >= 1 <br>Default: 1<br>Where results are across multiple pages, the page of results to return. |

### Responses

**301**

Moved Permanently

get/{court}/{subdivision}/{year}/atom.xml

Find Case Law

https://caselaw.nationalarchives.gov.uk/{court}/{subdivision}/{year}/atom.xml