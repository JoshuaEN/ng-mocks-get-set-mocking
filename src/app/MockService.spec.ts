import { MockService } from "ng-mocks";

class Example {
    get hardCodedGet() {
        return 'return value from hardCodedGet';
    }

    private _dynamicGet = 'return value from dynamicGet';
    get dynamicGet() {
        return this._dynamicGet;
    }

    hardCodedMethod() {
        return 'return value from hardCodedMethod';
    }

    private _dynamicMethod = 'return value from dynamicMethod';
    dynamicMethod() {
        return this._dynamicMethod;
    }
}

describe('ng-mocks MockService class mocking behavior', () => {
    it('should mock get/set properties and methods', () => {
        const mockedExample = MockService(Example);

        // Properties
        expect(mockedExample.hardCodedGet).toBeUndefined(); // Fails
        expect(mockedExample.dynamicGet).toBeUndefined(); // Passes
        mockedExample['_dynamicGet'] = 'value set in test to _dynamicGet';
        expect(mockedExample.dynamicGet).toBeUndefined(); // Fails because backing field was set in the line above

        // Methods
        expect(mockedExample.hardCodedMethod()).toBeUndefined(); // Passes
        expect(mockedExample.dynamicMethod()).toBeUndefined(); // Passes
        mockedExample['_dynamicMethod'] = 'value set in test to _dynamicMethod';
        expect(mockedExample.dynamicMethod()).toBeUndefined(); // Passes
    });
});