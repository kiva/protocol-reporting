/* eslint-disable no-console */
import request from 'supertest';

/**
 * Run mutations and queries against graphql api
 * For simplicity we test against a running reporting service instance and a dockerized postgres instance
 */
describe('Test graphql API', () => {
    const reportingUrl = 'http://localhost:3022';

    beforeAll(async () => {
    });

    it('Mutation to add FINGERPRINT report', () => {
        const query = `mutation {
            createOneReport(input: {
              report: {
                auth_method: "FINGERPRINT",
                verifier_id: "1",
                verifier_user_id: "abc",
                request_id: "${Math.random()}",
                session_id: "1",
                result_code:"SUCCESS",
                success: true
              }
            }) {
              id,
              create_time
            }
          }`;
        const data = {
            operationName: null,
            variables: {},
            query
        };
        return request(reportingUrl)
        .post('/graphql')
        .send(data)
        .expect((res) => {
            console.log(res.body);
            expect(res.status).toBe(200);
            expect(res.body.data).not.toBeNull();
            expect(res.body.errors).toBeUndefined();
            expect(res.body.data.createOneReport.id).toBeDefined();
        });
    });

    it('Mutation to add another FINGERPRINT report failure', () => {
        const query = `mutation {
            createOneReport(input: {
              report: {
                auth_method: "FINGERPRINT",
                verifier_id: "1",
                verifier_user_id: "abc",
                request_id: "${Math.random()}",
                session_id: "1",
                result_code:"NO_MATCH",
                success: false
              }
            }) {
              id,
              create_time
            }
          }`;
        const data = {
            operationName: null,
            variables: {},
            query
        };
        return request(reportingUrl)
        .post('/graphql')
        .send(data)
        .expect((res) => {
            console.log(res.body);
            expect(res.status).toBe(200);
            expect(res.body.data).not.toBeNull();
            expect(res.body.errors).toBeUndefined();
            expect(res.body.data.createOneReport.id).toBeDefined();
        });
    });

    it('Query to filter by auth_method', () => {
        const query = `{
            reports (
              filter: { auth_method: { eq: "FINGERPRINT" } },
              sorting:[{field: id, direction: ASC}] 
            ) {
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
              edges {
                node {
                    id
                      create_time
                      auth_method
                }
                cursor
              }
            }
          }`;
        const data = {
            operationName: null,
            variables: {},
            query
        };
        return request(reportingUrl)
        .post('/graphql')
        .send(data)
        .expect((res) => {
            console.log(res.body);
            expect(res.status).toBe(200);
            expect(res.body.data).not.toBeNull();
            expect(res.body.errors).toBeUndefined();
            expect(res.body.data.reports.edges[0].node.id).toBe('1');
            expect(res.body.data.reports.edges[0].node.auth_method).toBe('FINGERPRINT');
        });
    });

    it('Query to filter by success', () => {
        const query = `{
            reports (
              filter: { success: { is: false } },
              sorting:[{field: id, direction: ASC}] 
            ) {
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
              edges {
                node {
                    id
                    create_time
                    auth_method
                    success
                }
                cursor
              }
            }
          }`;
        const data = {
            operationName: null,
            variables: {},
            query
        };
        return request(reportingUrl)
        .post('/graphql')
        .send(data)
        .expect((res) => {
            console.log(res.body);
            expect(res.status).toBe(200);
            expect(res.body.data).not.toBeNull();
            expect(res.body.errors).toBeUndefined();
            expect(res.body.data.reports.edges[0].node.id).toBe('2');
            expect(res.body.data.reports.edges[0].node.success).toBe(false);
        });
    });
});
