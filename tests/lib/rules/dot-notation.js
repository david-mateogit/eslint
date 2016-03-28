/**
 * @fileoverview Tests for dot-notation rule.
 * @author Josh Perez
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/dot-notation"),
    RuleTester = require("../../../lib/testers/rule-tester");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();

ruleTester.run("dot-notation", rule, {
    valid: [
        "a.b;",
        "a.b.c;",
        "a['12'];",
        "a[b];",
        "a[0];",
        { code: "a.b.c;", options: [{allowKeywords: false}] },
        { code: "a.arguments;", options: [{allowKeywords: false}] },
        { code: "a.let;", options: [{allowKeywords: false}] },
        { code: "a.yield;", options: [{allowKeywords: false}] },
        { code: "a.eval;", options: [{allowKeywords: false}] },
        { code: "a[0];", options: [{allowKeywords: false}] },
        { code: "a['while'];", options: [{allowKeywords: false}] },
        { code: "a['true'];", options: [{allowKeywords: false}] },
        { code: "a['null'];", options: [{allowKeywords: false}] },
        { code: "a[true];", options: [{allowKeywords: false}] },
        { code: "a[null];", options: [{allowKeywords: false}] },
        { code: "a.true;", options: [{allowKeywords: true}] },
        { code: "a.null;", options: [{allowKeywords: true}] },
        { code: "a['snake_case'];", options: [{allowPattern: "^[a-z]+(_[a-z]+)+$"}] },
        { code: "a['lots_of_snake_case'];", options: [{allowPattern: "^[a-z]+(_[a-z]+)+$"}] },
        "a.true;",
        "a.null;",
        "a[undefined];",
        "a[void 0];",
        "a[b()];"
    ],
    invalid: [
        { code: "a.true;", options: [{allowKeywords: false}], errors: [{ message: ".true is a syntax error." }] },
        { code: "a['true'];", errors: [{ message: "[\"true\"] is better written in dot notation." }] },
        { code: "a[null];", errors: [{ message: "[null] is better written in dot notation." }] },
        { code: "a['b'];", errors: [{ message: "[\"b\"] is better written in dot notation." }] },
        { code: "a.b['c'];", errors: [{ message: "[\"c\"] is better written in dot notation." }] },
        { code: "a['_dangle'];", options: [{allowPattern: "^[a-z]+(_[a-z]+)+$"}], errors: [{ message: "[\"_dangle\"] is better written in dot notation." }] },
        { code: "a['SHOUT_CASE'];", options: [{allowPattern: "^[a-z]+(_[a-z]+)+$"}], errors: [{ message: "[\"SHOUT_CASE\"] is better written in dot notation." }] },
        {
            code:
                "a\n" +
                "  ['SHOUT_CASE'];",
            errors: [{
                message: "[\"SHOUT_CASE\"] is better written in dot notation.",
                line: 2,
                column: 4
            }]
        },
        {
            code:
            "getResource()\n" +
            "    .then(function(){})\n" +
            "    [\"catch\"](function(){})\n" +
            "    .then(function(){})\n" +
            "    [\"catch\"](function(){});",
            errors: [
                {
                    message: "[\"catch\"] is better written in dot notation.",
                    line: 3,
                    column: 6
                },
                {
                    message: "[\"catch\"] is better written in dot notation.",
                    line: 5,
                    column: 6
                }
            ]
        }
    ]
});
