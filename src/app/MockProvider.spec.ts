import { TestBed } from '@angular/core/testing';
import { MockProvider, MockComponent, MockService } from 'ng-mocks';
import { Injectable, Component, Input, ViewChild } from '@angular/core';

@Injectable()
export class ExampleService {
  public get getOnlyProp(): string { throw new Error('Not mocked'); }

  public get getSetProp(): string {
    throw new Error('Not mocked');
  }
  public set getSetProp(value: string) {
    throw new Error('Not mocked');
  }

  method(): string {
    throw new Error('Not mocked');
  }
}

describe('ng-mocks provider mocking behavior', () => {
    let exampleService: ExampleService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MockProvider(ExampleService)]
        });

        exampleService = TestBed.inject(ExampleService);
    });

    describe('get/set property', () => {
        it('should default to `undefined`', () => {
            expect(exampleService.getSetProp).toBeUndefined();
        });

        it('should return the last value set to setter', () => {
            const expected = 'test-string';

            exampleService.getSetProp = expected;

            expect(exampleService.getSetProp).toBe(expected);
        });

        it('should have a spyable getter', () => {
            expect(() => spyOnProperty(exampleService, 'getSetProp', 'get')).not.toThrow();
        });

        it('should have a spyable setter', () => {
            expect(() => spyOnProperty(exampleService, 'getSetProp', 'set')).not.toThrow();
        });
    });

    describe('get only property', () => {
        it('should default to `undefined`', () => {
            expect(exampleService.getOnlyProp).toBeUndefined();
        });

        it('should throw when trying to set', () => {
            expect(() => (exampleService as any).getOnlyProp = 'should-throw').toThrow();
        });

        it('should have a spyable getter', () => {
            expect(() => spyOnProperty(exampleService, 'getOnlyProp', 'get')).not.toThrow();
        });

        it('should not have a spyable setter', () => {
            expect(() => spyOnProperty(exampleService, 'getOnlyProp', 'set')).toThrow();
        });
    });

    describe('method', () => {
        it('should return `undefined` by default', () => {
            expect(exampleService.method()).toBeUndefined();
        });

        it('should be possible to spy on', () => {
            expect(() => spyOn(exampleService, 'method')).not.toThrow();
        });
    });
});
