import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';
import { Types } from 'mongoose';

const isValid = Types.ObjectId.isValid;

export const ObjectId = new GraphQLScalarType({
    name: 'ObjectId',

    description:
        'A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c',

    serialize(value) {
        if (value == null) {
            return null;
        }

        if (value instanceof Types.ObjectId) {
            return value.toString();
        }

        if (typeof value === 'string' && isValid(value)) {
            return value;
        }

        throw new GraphQLError(`Expected server to produce ObjectId, got: ${value}`, {
            extensions: {
                code: 'INTERNAL_SERVER_ERROR',
            },
        });
    },

    parseValue(value) {
        if (typeof value !== 'string') {
            throw new GraphQLError(`Can only validate strings as ObjectId, got a: ${typeof value} ${value}`);
        }

        if (!isValid(value)) {
            throw new GraphQLError('Expected ObjectId');
        }

        return new Types.ObjectId(value);
    },

    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(`Can only validate strings as ObjectId, got a: ${ast.kind}`, {
                nodes: ast,
            });
        }

        if (!isValid(ast.value)) {
            throw new GraphQLError(`Expected ObjectId, got: ${ast.value}`, {
                nodes: ast,
            });
        }

        return new Types.ObjectId(ast.value);
    },
});
