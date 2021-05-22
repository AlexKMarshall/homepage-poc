import faker from "faker";

const backendData = {
  data: {
    project_homepage: {
      uid: faker.datatype.uuid(),
      project: {
        uid: faker.datatype.uuid(),
        name: faker.company.companyName(),
      },
      sections: [
        {
          position: 1,
          uid: faker.datatype.uuid(),
          name: faker.company.catchPhrase(),
          widgets: [
            {
              position: 1,
              uid: faker.datatype.uuid(),
              type: "cards",
              items: [
                {
                  position: 1,
                  uid: faker.datatype.uuid(),
                  span: 4,
                  title: faker.company.bsBuzz(),
                  imgUrl: faker.image.imageUrl(),
                  description: faker.lorem.sentence(),
                },
                {
                  position: 2,
                  uid: faker.datatype.uuid(),
                  span: 4,
                  title: faker.company.bsBuzz(),
                  imgUrl: faker.image.imageUrl(),
                  description: faker.lorem.sentence(),
                },
                {
                  position: 3,
                  uid: faker.datatype.uuid(),
                  span: 4,
                  title: faker.company.bsBuzz(),
                  imgUrl: faker.image.imageUrl(),
                  description: faker.lorem.sentence(),
                },
              ],
            },
            {
              position: 2,
              uid: faker.datatype.uuid(),
              type: "cards",
              items: [
                {
                  position: 1,
                  uid: faker.datatype.uuid(),
                  span: 4,
                  title: faker.company.bsBuzz(),
                  imgUrl: faker.image.imageUrl(),
                  description: faker.lorem.sentence(),
                },
                {
                  position: 2,
                  uid: faker.datatype.uuid(),
                  span: 4,
                  title: faker.company.bsBuzz(),
                  imgUrl: faker.image.imageUrl(),
                  description: faker.lorem.sentence(),
                },
                {
                  position: 3,
                  uid: faker.datatype.uuid(),
                  span: 4,
                  title: faker.company.bsBuzz(),
                  imgUrl: faker.image.imageUrl(),
                  description: faker.lorem.sentence(),
                },
              ],
            },
            {
              position: 3,
              uid: faker.datatype.uuid(),
              type: "cards",
              items: [
                {
                  position: 1,
                  uid: faker.datatype.uuid(),
                  span: 8,
                  title: faker.company.bsBuzz(),
                  imgUrl: faker.image.imageUrl(),
                  description: faker.lorem.sentence(),
                },
                {
                  position: 3,
                  uid: faker.datatype.uuid(),
                  span: 4,
                  title: faker.company.bsBuzz(),
                  imgUrl: faker.image.imageUrl(),
                  description: faker.lorem.sentence(),
                },
              ],
            },
            {
              position: 4,
              uid: faker.datatype.uuid(),
              type: "cards",
              items: [
                {
                  position: 1,
                  uid: faker.datatype.uuid(),
                  span: 12,
                  title: faker.company.bsBuzz(),
                  imgUrl: faker.image.imageUrl(),
                  description: faker.lorem.sentence(),
                },
              ],
            },
            {
              position: 5,
              uid: faker.datatype.uuid(),
              type: "headline",
              title: faker.company.bsBuzz(),
              description: faker.lorem.sentence(),
            },
            {
              position: 6,
              uid: faker.datatype.uuid(),
              type: "hero",
              title: faker.company.bsBuzz(),
              imgUrl: faker.image.imageUrl(),
            },
          ],
        },
        {
          position: 2,
          uid: faker.datatype.uuid(),
          name: faker.company.catchPhrase(),
          widgets: [
            {
              position: 1,
              uid: faker.datatype.uuid(),
              type: "cards",
              items: [
                {
                  position: 1,
                  uid: faker.datatype.uuid(),
                  span: 4,
                  title: faker.company.bsBuzz(),
                  imgUrl: faker.image.imageUrl(),
                  description: faker.lorem.sentence(),
                },
                {
                  position: 2,
                  uid: faker.datatype.uuid(),
                  span: 4,
                  title: faker.company.bsBuzz(),
                  imgUrl: faker.image.imageUrl(),
                  description: faker.lorem.sentence(),
                },
                {
                  position: 3,
                  uid: faker.datatype.uuid(),
                  span: 4,
                  title: faker.company.bsBuzz(),
                  imgUrl: faker.image.imageUrl(),
                  description: faker.lorem.sentence(),
                },
              ],
            },
            {
              position: 2,
              uid: faker.datatype.uuid(),
              type: "cards",
              items: [
                {
                  position: 1,
                  uid: faker.datatype.uuid(),
                  span: 4,
                  title: faker.company.bsBuzz(),
                  imgUrl: faker.image.imageUrl(),
                  description: faker.lorem.sentence(),
                },
                {
                  position: 2,
                  uid: faker.datatype.uuid(),
                  span: 4,
                  title: faker.company.bsBuzz(),
                  imgUrl: faker.image.imageUrl(),
                  description: faker.lorem.sentence(),
                },
                {
                  position: 3,
                  uid: faker.datatype.uuid(),
                  span: 4,
                  title: faker.company.bsBuzz(),
                  imgUrl: faker.image.imageUrl(),
                  description: faker.lorem.sentence(),
                },
              ],
            },
            {
              position: 3,
              uid: faker.datatype.uuid(),
              type: "cards",
              items: [
                {
                  position: 1,
                  uid: faker.datatype.uuid(),
                  span: 8,
                  title: faker.company.bsBuzz(),
                  imgUrl: faker.image.imageUrl(),
                  description: faker.lorem.sentence(),
                },
                {
                  position: 3,
                  uid: faker.datatype.uuid(),
                  span: 4,
                  title: faker.company.bsBuzz(),
                  imgUrl: faker.image.imageUrl(),
                  description: faker.lorem.sentence(),
                },
              ],
            },
            {
              position: 4,
              uid: faker.datatype.uuid(),
              type: "cards",
              items: [
                {
                  position: 1,
                  uid: faker.datatype.uuid(),
                  span: 12,
                  title: faker.company.bsBuzz(),
                  imgUrl: faker.image.imageUrl(),
                  description: faker.lorem.sentence(),
                },
              ],
            },
            {
              position: 5,
              uid: faker.datatype.uuid(),
              type: "headline",
              title: faker.company.bsBuzz(),
              description: faker.lorem.sentence(),
            },
            {
              position: 6,
              uid: faker.datatype.uuid(),
              type: "hero",
              title: faker.company.bsBuzz(),
              imgUrl: faker.image.imageUrl(),
            },
          ],
        },
      ],
    },
  },
};

// trying a flatter structure for layout
// this should make it easier to re-order individual widgets
// as you don't have to recreate a deeply nested structure
export function queryFlatLayoutData() {
  return {
    homepageDetails: {
      project: backendData.data.project_homepage.project,
      uid: backendData.data.project_homepage.uid,
      sectionIds: backendData.data.project_homepage.sections.map(
        (section) => section.uid
      ),
    },
    sectionDetails: backendData.data.project_homepage.sections.reduce(
      (acc, cur) => {
        return Object.assign(acc, {
          [cur.uid]: {
            uid: cur.uid,
            name: cur.name,
            widgetIds: cur.widgets.map((widget) => widget.uid),
          },
        });
      },
      {}
    ),
    widgetDetails: backendData.data.project_homepage.sections
      .flatMap((section) => section.widgets)
      .reduce((acc, cur) => {
        return Object.assign(acc, {
          [cur.uid]: {
            uid: cur.uid,
            type: cur.type,
            title: cur.title,
            imgUrl: cur.imgUrl,
            description: cur.description,
            itemIds: cur.items?.map((item) => item.uid),
          },
        });
      }, {}),
    itemDetails: backendData.data.project_homepage.sections
      .flatMap((section) => section.widgets)
      .flatMap((widget) => widget.items)
      .filter((item) => item !== undefined)
      .reduce((acc, cur) => {
        return Object.assign(acc, {
          [cur.uid]: {
            uid: cur.uid,
            span: cur.span,
            title: cur.title,
            description: cur.description,
            imgUrl: cur.imgUrl,
          },
        });
      }, {}),
  };
}

// this gives us just the layout information
export function queryLayoutData() {
  return {
    ...backendData,
    data: {
      ...backendData.data,
      project_homepage: {
        ...backendData.data.project_homepage,
        sections: backendData.data.project_homepage.sections.map((section) => ({
          ...section,
          widgets: section.widgets.map((widget) => ({
            uid: widget.uid,
            position: widget.position,
            type: widget.type,
            items: widget.items?.map((item) => ({
              uid: item.uid,
              position: item.position,
              span: item.span,
            })),
          })),
        })),
      },
    },
  };
}

function allWidgets() {
  return backendData.data.project_homepage.sections.flatMap(
    (section) => section.widgets
  );
}

// this gives us the details of a single widget, and for cards it
// gives us the items in a hash object, rather than an array
// so the layout and content can be separate on the front end
export function querySingleWidget(widgetUid) {
  const backendWidget = allWidgets().find((widget) => widget.uid === widgetUid);
  if (backendWidget) {
    const { items, ...widgetDetails } = {
      ...backendWidget,
      itemDetails: backendWidget.items?.reduce(
        (acc, cur) => Object.assign(acc, { [cur.uid]: cur }),
        {}
      ),
    };
    return widgetDetails;
  }
}
