
import logging
import pkg_resources

from xblock.core import XBlock
from xblock.fields import Scope, String, Integer, Boolean, List
# from xblock.exception import XBlockSaveError
from xblock.fragment import Fragment

from referenceapp.models import Referenceapp #importing referenceapp model from edx

from .utils import loader, AttrDict

log = logging.getLogger(__name__)

class ReferenceBlock(XBlock):
    # """docstring for ReferenceBlock"""
    # def __init__(self, arg):
    #   super(ReferenceBlock, self).__init__()
    #   self.arg = arg

    #define variable
    referenceapp_links = List(
        help="Contains the reference links to share with student",
        default=[],
        scope=Scope.settings,
    )


    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    def _is_studio(self):
        """
        This Function checks if call is from CMS or LMS and returns boolean
        True if call is from studio.
        """
        studio = False
        try:
            studio = self.runtime.is_author_mode
        except AttributeError:
            pass
        return studio

    def _user_is_staff(self):
        """
        This Function checks if user is staff and returns boolean
        True if user is staff.
        """
        return getattr(self.runtime, 'user_is_staff', False)

    def get_block_id(self):
        """
        Thsi function returns the block id.
        """
        return self.url_name

    def _render_template(self, ressource, **kwargs):
        template = Template(self.resource_string(ressource))
        context = dict({}, **kwargs)
        html = template.render(Context(context))
        return html

    def student_view(self, context=None):
        """
            Create a fragment used to display the XBlock to a student.
            `context` is a dictionary used to configure the display (unused)

            Returns a `Fragment` object specifying the HTML, CSS, and JavaScript
            to display.
        """
        # # Load the HTML fragment from within the package and fill in the template
        # html_str = pkg_resources.resource_string(__name__,
        #     "templates/html/student_referenceapp.html")
        # frag = Fragment(unicode(html_str).format(self=self))

        # # Load the CSS and JavaScript fragments from within the package
        # css_str = pkg_resources.resource_string(__name__, "static/css/custom.css")
        # frag.add_css(unicode(css_str))

        # js_str = pkg_resources.resource_string(__name__,"static/js/custom.js")
        # frag.add_javascript(unicode(js_str))

        # frag.initialize_js('ReferenceBlock')
        # return frag


        fragment = Fragment()
        fragment.add_content(loader.render_template(
                                'templates/html/student_referenceapp.html',
                                {'data': self.referenceapp_links, 'self': self})
                            )
        fragment.add_css(
            self.resource_string("static/css/custom.css"))
        fragment.add_javascript(
            self.resource_string("static/js/custom.js"))
        fragment.initialize_js('ReferenceBlock')
        return fragment

    def studio_view(self, context=None):
        #get list of ref links
        all_ref = Referenceapp.objects.all()

        current_links = self.referenceapp_links

        for cur_ref in current_links:
            cur_link = cur_ref['ref_link']
            for new_ref in all_ref:
                if new_ref.reference_link == cur_link:
                    new_ref.disable = True

        fragment = Fragment()
        fragment.add_content(loader.render_template(
                                    'templates/html/studio_referenceapp.html',
                                    {'data': all_ref})
                            )
        fragment.add_css(
            self.resource_string("static/css/custom.css"))
        fragment.add_javascript(
            self.resource_string("static/js/custom.js"))
        fragment.initialize_js('ReferenceBlock')
        return fragment

    @XBlock.json_handler
    def studio_add_submit(self, data, suffix=''):
        ref_id = data.get('ref_id')
        ref_name = data.get('ref_name')
        ref_link = data.get('ref_link')
        ref_desc = data.get('ref_desc')

        current_links = self.referenceapp_links
        flag_exists = False
        for i_dic in current_links:
            if i_dic['ref_link'] == ref_link:
                flag_exists = True

        if flag_exists == False:
            ref_data = current_links
            ref_dict = {
                'ref_id':ref_id,
                'ref_name':ref_name,
                'ref_link': ref_link,
                'ref_desc':ref_desc
            }
            ref_data.append(ref_dict)
            self.referenceapp_links = ref_data;
            return {'status':'success'}
        else:
            return {'status':'error'}

    @XBlock.json_handler
    def studio_remove_submit(self, data, suffix=''):
        ref_id = data.get('ref_id')
        ref_name = data.get('ref_name')
        ref_link = data.get('ref_link')
        ref_desc = data.get('ref_desc')

        current_links = self.referenceapp_links
        flag_exists = False
        for i_dic in current_links:
            if i_dic['ref_link'] == ref_link:
                flag_exists = True
                current_links.remove(i_dic)

        if flag_exists == True:
            self.referenceapp_links = current_links;
            frag = self.studio_view({})
            return {'status':'success', 'html': frag.content}
        else:
            return {'status':'error'}


    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [("Reference scenario",
                "<vertical_demo><reference-block/></vertical_demo>")]